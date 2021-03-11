<template>
  <div class="dataModelIndex">
    <!-- 查询搜索项 -->
    <div class="dataModelIndex_query">
      <el-form
        :inline="true"
        :model="searchForm"
        class="dataModelIndex_query_from p-l"
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
        <!-- 身份证 -->
        <el-form-item
          label="证件号码"
          prop="IDcard"
        >
          <el-input
            prefix-icon="el-icon-search"
            placeholder="证件号码"
            v-model="searchForm.IDcard"
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
        <!-- 结节 -->
        <el-form-item
          label="结节"
          prop="nodules"
        >
          <el-select
            v-model="searchForm.nodules"
            placeholder="请选择结节大小"
          >
            <el-option
              label="等于6"
              value="0"
            >等于6</el-option>
            <el-option
              label="大于6"
              value="1"
            >大于6</el-option>
            <el-option
              label="小于15"
              value="2"
            >小于15</el-option>
          </el-select>
        </el-form-item>
        <!-- 治疗方案 -->
        <el-form-item
          label="治疗方案"
          prop="case"
        >
          <el-select
            v-model="searchForm.case"
            placeholder="请选择治疗方案"
          >
            <el-option
              label="保守治疗"
              value="0"
            >保守治疗</el-option>
            <el-option
              label="手术治疗"
              value="1"
            >手术治疗</el-option>
            <el-option
              label="观察治疗"
              value="2"
            >观察治疗</el-option>
          </el-select>
        </el-form-item>
        <!-- 风险等级 -->
        <el-form-item
          label="风险等级"
          prop="level"
        >
          <el-select
            v-model="searchForm.level"
            placeholder="请选择风险等级"
          >
            <el-option
              label="无风险"
              value="0"
            >无风险</el-option>
            <el-option
              label="中风险"
              value="1"
            >中风险</el-option>
            <el-option
              label="高风险"
              value="2"
            >高风险</el-option>
          </el-select>
        </el-form-item>
        <!-- 随访状态 -->
        <el-form-item
          label="随访状态"
          prop="status"
        >
          <el-select
            v-model="searchForm.status"
            placeholder="请选择随访状态"
          >
            <el-option
              label="未随访"
              value="0"
            >未随访</el-option>
            <el-option
              label="已随访"
              value="1"
            >已随访</el-option>
            <el-option
              label="脱访"
              value="2"
            >脱访</el-option>
            <el-option
              label="漏访"
              value="2"
            >漏访</el-option>
          </el-select>
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
          <!-- 导出 -->
          <el-button
            type="success"
            @click="handleExport"
          >导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- table 数据展示 -->
    <div class="dataModelIndex_table">
      <el-table
        :data="tableData"
        style="width: 100%"
        max-height="400"
        ref="multipleTable"
        tooltip-effect="dark"
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
          width="80"
        />
        <el-table-column
          prop="name"
          label="姓名"
          width="120"
        />
        <el-table-column
          prop="IDcard"
          label="身份证"
          width="180"
        />
        <el-table-column
          prop="sex"
          label="性别"
          width="80"
        />
        <el-table-column
          prop="status"
          label="随访状态"
          width="120"
        />
        <el-table-column
          prop="CTresult"
          label="CT结果"
          width="150"
        />
        <el-table-column
          prop="case"
          label="治疗方案"
          width=""
        />
        <el-table-column
          prop="doctor"
          label="医生建议"
          width=""
        />
        <el-table-column
          prop="doctorName"
          label="医生姓名"
          width=""
        />
        <el-table-column
          prop="phone"
          label="联系方式"
          width="120"
        />
        <el-table-column
          prop="status"
          label="随访状态"
          width=""
        />
        <el-table-column
          prop="results"
          label="随访结果"
          width=""
          fixed="right"
        />
      </el-table>
    </div>
    <!-- 分页底部展示 -->
    <div class="dataModelIndex_footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

  </div>
</template>

<script>
export default {
  name: "screeningReviewIndex", //随访任务
  data() {
    return {
      total: 0, // 查询总数
      pageNum: 1, // 查询分页
      pageSize: 5, // 查询分页
      searchForm: {
        level: '',//风险等级
        case: '',//治疗方案
        nodules: '',//结节
        name: "", //姓名
        IDcard: "", //身份证号
        area: '',//行政区划
        status: '',//随访状态
      }, //查询条件
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
      tableData: [
        {
          key: "1",
          name: "测试",
          IDcard: "231084199601261515",
          sex: "男",
          CTresult: "有结果：4-6cm",
          status: "未随访",
          case: '手术治疗',
          doctor: '立即手术',
          doctorName: '张医生',
          phone: '13246122389',
          results: '没结果',
        },
        {
          key: "2",
          name: "测试",
          IDcard: "231084199601261515",
          sex: "男",
          CTresult: "有结果：4-6cm",
          status: "已随访",
          case: '手术治疗',
          doctor: '立即手术',
          doctorName: '张医生',
          phone: '13246122389',
          results: '没结果',
        },
        {
          key: "3",
          name: "测试",
          IDcard: "231084199601261515",
          sex: "男",
          CTresult: "有结果：4-6cm",
          status: "脱访",
          case: '手术治疗',
          doctor: '立即手术',
          doctorName: '张医生',
          phone: '13246122389',
          results: '没结果',
        },
        {
          key: "4",
          name: "测试",
          IDcard: "231084199601261515",
          sex: "男",
          CTresult: "有结果：4-6cm",
          status: "漏访",
          case: '手术治疗',
          doctor: '立即手术',
          doctorName: '张医生',
          phone: '13246122389',
          results: '没结果',
        },
        {
          key: "5",
          name: "测试",
          IDcard: "231084199601261515",
          sex: "男",
          CTresult: "有结果：4-6cm",
          status: "脱访",
          case: '手术治疗',
          doctor: '立即手术',
          doctorName: '张医生',
          phone: '13246122389',
          results: '没结果',
        },
        {
          key: "6",
          name: "测试",
          IDcard: "231084199601261515",
          sex: "男",
          CTresult: "有结果：4-6cm",
          status: "脱访", case: '手术治疗',
          doctor: '立即手术',
          doctorName: '张医生',
          phone: '13246122389',
          results: '没结果',
        },
      ], //table模拟数据
      currentPage: 1,
      total: 100,
    };
  },

  methods: {
    //   查询
    handleSearch() {
      console.log("查询--->>>>", this.searchForm);
      alert("查询");
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 导出
    handleExport() {
      alert("导出");
    },
    //Table复选框选择
    handleSelectionChange(val) {
      console.log("table复选框选择----->>>>", val);
      this.examineList = val;
      if (val.length) {
        this.examineBtnStatus = true;
        return;
      }
      this.examineBtnStatus = false;
    },
    // 每页加载几条数据
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 分页-当前页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
};
</script>


<style lang="scss" scoped>
.dataModelIndex {
  .dataModelIndex_query {
    .dataModelIndex_query_from {
      background: #fff;
      padding: 12px 16px;
    }
  }
  .dataModelIndex_table {
    background: #fff;
  }
  .dataModelIndex_footer {
    margin-top: 10px;
  }
}
</style>


