<template>
  <div class="case">
    <!-- 查询搜索项 -->
    <div class="case_query">
      <el-form
        :inline="true"
        :model="searchForm"
        class="case_query_from p-l"
        size="mini"
        ref="searchForm"
      >
        <!-- 姓名 -->
        <el-form-item
          label="姓名"
          prop="name"
        >
          <el-input
            prefix-icon="el-icon-search"
            placeholder="姓名"
            v-model="searchForm.name"
          />
        </el-form-item>
        <!-- 证件类型 -->
        <el-form-item
          label="证件类型"
          prop="idCardType"
        >
          <el-select
            prefix-icon="el-icon-search"
            v-model="searchForm.idCardType"
            placeholder="请选择证件类型"
          >
            <el-option
              label="身份证"
              value="1"
            ></el-option>
            <el-option
              label="军官证"
              value="2"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 身份证 -->
        <el-form-item
          label="身份证"
          prop="idCard"
        >
          <el-input
            prefix-icon="el-icon-search"
            placeholder="身份证"
            v-model="searchForm.idCard"
          />
        </el-form-item>
        <!-- 性别 -->
        <el-form-item
          label="性别"
          prop="sex"
        >
          <el-select
            prefix-icon="el-icon-search"
            v-model="searchForm.sex"
            placeholder="请选择性别"
          >
            <el-option
              label="男"
              value="1"
            ></el-option>
            <el-option
              label="女"
              value="2"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 年龄 -->
        <el-form-item
          label="年龄"
          prop="ageMin"
          :rules="[
      { type: 'number', message: '年龄必须为数字值'}
    ]"
        >
          <el-input
            type="ageMin"
            v-model.number="searchForm.ageMin"
            placeholder="请输入最小年龄"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          -
        </el-form-item>
        <el-form-item
          prop="ageMax"
          :rules="[
      { type: 'number', message: '年龄必须为数字值'}
    ]"
        >
          <el-input
            type="ageMax"
            v-model.number="searchForm.ageMax"
            placeholder="请输入最小年龄"
            autocomplete="off"
          />
        </el-form-item>
        <!-- 行政区划 -->
        <el-form-item
          label="行政区划"
          prop="area"
        >
          <el-cascader
            :options="options"
            clearable
            prefix-icon="el-icon-search"
            v-model="searchForm.area"
            placeholder="请选择行政区划"
          ></el-cascader>
        </el-form-item>
        <!-- button -->
        <el-form-item>
          <!-- 查询 -->
          <el-button
            type="primary"
            @click="handleSearch"
          >查询</el-button>
          <!-- 重置 -->
          <el-button
            type="primary"
            @click="resetForm('searchForm')"
          >重置</el-button>
          <!-- 新增 -->
          <el-button
            type="success"
            @click="handleAddOrDetails('add')"
          >新增</el-button>
          <!-- 删除 -->
          <el-button
            type="success"
            @click="handleDel"
          >删除</el-button>
          <!-- 导出 -->
          <el-button
            type="success"
            @click="handleExport"
          >导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- table 数据展示 -->
    <div class="case_table">
      <el-table
        :data="tableData"
        style="width: 100%"
        max-height="400"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          fixed
          prop="key"
          label="序号"
        />

        <el-table-column
          prop="name"
          label="姓名"
        />
        <el-table-column
          prop="sex"
          label="性别"
        />
        <el-table-column
          prop="idCardType"
          label="证件类型"
        />
        <el-table-column
          prop="idCard"
          label="证件号码"
        />
        <el-table-column
          prop="telephone"
          label="联系方式"
        />
        <el-table-column
          fixed="right"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="handleAddOrDetails('edit',scope.$index, tableData)"
              type="text"
              size="small"
            >
              编辑
            </el-button>
            <el-button
              @click.native.prevent="handleAddOrDetails('details',scope.$index, tableData)"
              type="text"
              size="small"
            >
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页底部展示 -->
    <div class="case_footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10,20,30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <!-- 详情 新增 编辑-->
    <el-dialog
      :title="addOrDetailsOrEditModalType=='add'?'新增':addOrDetailsOrEditModalType=='details'?'详情':'编辑'"
      :visible.sync="visible"
      class="case_add"
    >
      <el-form
        :model="commonForm"
        label-position="left"
        ref="commonForm"
        :rules="ruleForm"
      >
        <template v-if="addOrDetailsOrEditModalType=='details'">
          <!-- 姓名 性别 出生日期-->
          <el-row>
            <el-form-item>
              <span>姓名：</span><span class="add_content">{{commonForm.name}}</span>
              <span class="add_margin"></span>
              <span>性别：</span>
              <el-radio-group
                v-model="commonForm.sex"
                disabled
              >
                <el-radio label="1">男</el-radio>
                <el-radio label="2">女</el-radio>
              </el-radio-group>
              <span class="add_margin"></span>
              <span>出生日期：</span><span class="add_content">{{commonForm.birth}}</span>
            </el-form-item>
          </el-row>
          <!-- 民族  籍贯-->
          <el-row>
            <el-form-item>
              <span>民族：</span><span class="add_content">{{commonForm.nation}}</span>
              <span class="add_margin"></span>
              <span>籍贯：</span>
              <span class="add_content">{{commonForm.birthplace}}</span>
            </el-form-item>
          </el-row>
          <!--   身份证号 本人联系电话 紧急联系电话-->
          <el-row>
            <el-form-item>
              <span>身份证号：</span>
              <span class="add_content">{{commonForm.idCard}}</span>
              <span class="add_margin"></span>
              <span>本人联系电话：</span><span class="add_content">{{commonForm.telephone}}</span>
              <span class="add_margin"></span>
              <span>紧急联系电话：</span>
              <span class="add_content">{{commonForm.telephoneOther}}</span>
            </el-form-item>
          </el-row>
          <!-- 常住地址 工作单位-->
          <el-row>
            <el-form-item>
              <span>常住地址：</span><span class="add_content">{{commonForm.area}}</span>
              <span class="add_margin"></span>
              <span>工作单位：</span>
              <span class="add_content">{{commonForm.unit}}</span>
            </el-form-item>
          </el-row>
        </template>
        <template v-else>
          <!-- 姓名 性别 -->
          <el-row :gutter="4">
            <el-col :span="12">
              <el-form-item
                label="姓名："
                prop="name"
                label-width="80px"
              >
                <el-input
                  placeholder="请输入姓名"
                  v-model="commonForm.name"
                  style="width: 100%;"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="sex"
                label="性别："
              >
                <el-radio-group v-model="commonForm.sex">
                  <el-radio label="1">男</el-radio>
                  <el-radio label="2">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 出生日期  籍贯-->
          <el-row :gutter="4">
            <el-col :span="12">
              <el-form-item
                label="出生日期："
                prop="birth"
                label-width="100px"
              >
                <el-date-picker
                  v-model="commonForm.birth"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="birthplace"
                label="籍贯："
                label-width="60px"
              >
                <el-input
                  placeholder="请输入籍贯"
                  v-model="commonForm.birthplace"
                  style="width: 100%;"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 民族  身份证号-->
          <el-row :gutter="4">
            <el-col :span="12">
              <el-form-item
                label="民族："
                prop="nation"
                label-width="60px"
              >
                <el-input
                  placeholder="请输入民族"
                  v-model="commonForm.nation"
                  style="width: 100%;"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="idCard"
                label="身份证号："
                label-width="100px"
              >
                <el-input
                  placeholder="请输入身份证号"
                  v-model="commonForm.idCard"
                  style="width: 100%;"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 本人联系电话 紧急联系电话-->
          <el-row :gutter="4">
            <el-col :span="12">
              <el-form-item
                label="本人联系电话："
                prop="telephone"
                label-width="130px"
              >
                <el-input
                  placeholder="请输入本人联系电话"
                  v-model="commonForm.telephone"
                  style="width: 100%;"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="telephoneOther"
                label="紧急联系电话："
                label-width="130px"
              >
                <el-input
                  placeholder="请输入本人联系电话"
                  v-model="commonForm.telephoneOther"
                  style="width: 100%;"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--常住地址  工作单位 -->
          <el-row :gutter="4">
            <el-col :span="12">
              <el-form-item
                label="常住地址："
                prop="name"
                label-width="100px"
              >
                <el-input
                  placeholder="请输入常住地址"
                  v-model="commonForm.area"
                  style="width: 100%;"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="unit"
                label="工作单位："
                label-width="100px"
              >
                <el-input
                  placeholder="请输入工作单位"
                  v-model="commonForm.unit"
                  style="width: 100%;"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="居民健康档案编码："
              prop="code"
            >
              <span class="add_content">{{commonForm.code}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item prop="smoke">
            <div>
              <p>1、您是否吸烟（每天吸一支以上并连续或累计6个月以上者定义为吸烟）？</p>
            </div>
            <el-radio-group v-model="commonForm.smoke">
              <el-radio
                label="是，目前仍在吸烟"
                value="1"
              ></el-radio>
              <el-radio
                label="否，从不吸烟"
                value="0"
              ></el-radio>
              <el-radio
                label="以前吸，目前戒烟"
                value="2"
              ></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item prop="passiveSmoking">
            <div>
              <p>2、您是否患有慢性阻塞性肺疾病？</p>
            </div>
            <el-radio-group v-model="commonForm.passiveSmoking">
              <el-radio
                label="是"
                value="1"
              ></el-radio>
              <el-radio
                label="否"
                value="0"
              ></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item prop="exposeHis">
            <div>
              <p>3、您是否有有害物质职业接触史（一年以上）？</p>
            </div>
            <el-radio-group v-model="commonForm.exposeHis">
              <el-radio
                label="是"
                value="1"
              ></el-radio>
              <el-radio
                label="否"
                value="0"
              ></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item prop="pastMaliGnant">
            <div>
              <p>4、您的父母、子女或者兄弟姐妹（同父母）是否患有肺癌（经正规医疗机构明确诊断）？</p>
            </div>
            <el-radio-group v-model="commonForm.pastMaliGnant">
              <el-radio
                label="是"
                value="1"
              ></el-radio>
              <el-radio
                label="否"
                value="0"
              ></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="visible=false">取 消</el-button>
        <el-button
          type="primary"
          @click="detailsOk('commonForm',addOrDetailsOrEditModalType)"
        >确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

export default {
  name: 'caseIndex',//个案信息
  data() {
    return {
      total: 0, // 查询总数
      pageNum: 1, // 查询分页
      pageSize: 5, // 查询分页
      searchForm: {
        name: '',//姓名
        idCard: '',//身份证
        idCardType: '',//证件类型
        sex: '',//性别
        area: '',//行政区划
        ageMin: '',//最小年龄
        ageMax: '',//最大年龄
      },//查询条件
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],//联动数据源
      tableData: [{
        key: '1',
        name: '测试',
        idCardType: '居民身份证',
        idCard: '231084199601291615',
        sex: '男',
        telephone: '17644885599',

      }, {
        key: '2',
        name: '测试1',
        idCard: '231084199601291615',
        idCardType: '居民身份证',
        sex: '女',
        telephone: '17644885599',

      }, {
        key: '3',
        name: '测试',
        idCard: '231084199601291615',
        idCardType: '居民身份证',
        sex: '男',
        telephone: '17644885599',

      }, {
        key: '4',
        name: '测试',
        idCard: '231084199601291615',
        idCardType: '居民身份证',
        sex: '男',
        telephone: '17644885599',

      }, {
        key: '5',
        name: '测试',
        idCard: '231084199601291615',
        idCardType: '居民身份证',
        sex: '男',
        telephone: '17644885599',

      },],//table模拟数据
      currentPage: 1,
      total: 100,
      visible: false,//添加Modal显示隐藏
      commonForm: {
        name: '测试1',//姓名
        idCard: '231086199601291615',//身份证号码
        sex: '1',//性别
        telephone: '17614556128',//电话
        telephoneOther: '17614556128',//紧急电话
        birth: '',//出生日期
        nationality: '中华人民共和国',//国籍
        nation: '汉族',//民族
        birthplace: '北京',//出生地
        unit: '没有',//工作单位
        area: '北京市大兴区',//常住地址
        code: 'A568QWE265AD',//居民健康档案编码
        smoke: '',//是否吸烟
        passiveSmoking: '',//是否患有慢性阻塞性肺疾病
        pastMaliGnant: '',//父母是否患有肺癌

      },//Modal form表单
      ruleForm: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        idCard: [
          { required: true, message: '请输入身份证号码', trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        telephoneOther: [
          { required: true, message: '请输入紧急联系电话', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        birth: [
          { required: true, message: '请输入出生日期', trigger: 'change' }
        ]
      },
      addOrDetailsOrEditModalType: '',//modal框类别
    }
  },

  methods: {
    detailsOk(formName, type) {
      console.log('detailsOk', formName);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (type != 'details') {
            alert('submit!');
          }
          this.visible = false
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    //Table复选框选择
    handleSelectionChange(val) {
      console.log("table复选框选择----->>>>", val);
    },

    //   查询
    handleSearch() {
      console.log('查询--->>>>', this.searchForm);
      alert('查询')
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 新增 详情 编辑
    handleAddOrDetails(type, index, tableDate) {
      if (type == 'add') {

      }
      if (type == 'details') {
        console.log('新增 详情 编辑', type, index, tableDate[index]);
      }
      if (type == 'edit') {
        console.log('新增 详情 编辑', type, index, tableDate[index]);
      }
      this.addOrDetailsOrEditModalType = type
      this.visible = true
    },
    // 删除
    handleDel() {
      alert('删除')
    },
    // 导出
    handleExport() {
      alert('导出')
    },

    // 每页加载几条数据
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 分页-当前页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>


<style lang="scss" scoped>
.case {
  .case_query {
    .case_query_from {
      background: #fff;
      padding: 12px 16px;
    }
  }
  .case_table {
    background: #fff;
  }
  .case_footer {
    margin-top: 10px;
  }
}
.case_add {
  .el-form-item {
    margin-bottom: 18px;
  }
  .add_margin {
    margin: 0 10px;
  }
  .add_content {
    text-decoration: underline;
  }
}
</style>


