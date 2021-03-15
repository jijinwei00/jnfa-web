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
        <!-- 身份证 -->
        <el-form-item
          label="身份证"
          prop="idNo"
        >
          <el-input
            prefix-icon="el-icon-search"
            placeholder="身份证"
            v-model="searchForm.idNo"
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
          prop="minAge"
          :rules="[{ type: 'number', message: '年龄必须为数字值'}]"
        >
          <el-input
            type="minAge"
            v-model.number="searchForm.minAge"
            placeholder="请输入最小年龄"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          -
        </el-form-item>
        <el-form-item
          prop="maxAge"
          :rules="[{ type: 'number', message: '年龄必须为数字值'}]"
        >
          <el-input
            type="maxAge"
            v-model.number="searchForm.maxAge"
            placeholder="请输入最小年龄"
            autocomplete="off"
          />
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
    <div class="case_table">
      <el-table
        :data="caseList"
        style="width: 100%"
        max-height="400"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          type="index"
          label="序号"
          fixed
        ></el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
        />
        <el-table-column
          prop="sex"
          label="性别"
        />
        <el-table-column
          prop="cardType"
          label="证件类型"
        />
        <el-table-column
          prop="idNo"
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
              @click.native.prevent="getCaseDetail(scope.row.id)"
              type="text"
              size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 详情 新增 编辑-->
    <el-dialog
      :title="'详情'"
      :visible.sync="dialogVisible"
      class="case_add"
    >
      <el-form
        :model="caseDetail"
        label-position="left"
        ref="caseDetail"
      >
          <!-- 姓名 性别 出生日期-->
          <el-row>
            <el-form-item>
              <span>姓名：</span><span class="add_content">{{caseDetail.name}}</span>
              <span class="add_margin"></span>
              <span>性别：</span>
              <el-radio-group
                v-model="caseDetail.sex"
                disabled
              >
                <el-radio label="1">男</el-radio>
                <el-radio label="2">女</el-radio>
              </el-radio-group>
              <span class="add_margin"></span>
              <span>出生日期：</span><span class="add_content">{{caseDetail.birthday}}</span>
            </el-form-item>
          </el-row>
          <!-- 民族  籍贯-->
          <el-row>
            <el-form-item>
              <span>民族：</span><span class="add_content">{{caseDetail.nation}}</span>
              <span class="add_margin"></span>
              <span>籍贯：</span>
              <span class="add_content">{{caseDetail.nativePlace}}</span>
            </el-form-item>
          </el-row>
          <!--   身份证号 本人联系电话 紧急联系电话-->
          <el-row>
            <el-form-item>
              <span>身份证号：</span>
              <span class="add_content">{{caseDetail.idNo}}</span>
              <span class="add_margin"></span>
              <span>本人联系电话：</span><span class="add_content">{{caseDetail.telephone}}</span>
              <span class="add_margin"></span>
              <span>紧急联系电话：</span>
              <span class="add_content">{{caseDetail.emergencyTel}}</span>
            </el-form-item>
          </el-row>
          <!-- 常住地址 工作单位-->
          <el-row>
            <el-form-item>
              <span>常住地址：</span><span class="add_content">{{caseDetail.address}}</span>
              <span class="add_margin"></span>
            </el-form-item>
          </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="居民健康档案编码："
              prop="code">
              <span class="add_content">{{caseDetail.archiveId}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item prop="smookingStatus">
            <div>
              <p>1、您是否吸烟（每天吸一支以上并连续或累计6个月以上者定义为吸烟）？</p>
            </div>
            <el-radio-group v-model="caseDetail.smookingStatus">
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
          <el-form-item prop="copd">
            <div>
              <p>2、您是否患有慢性阻塞性肺疾病？</p>
            </div>
            <el-radio-group v-model="caseDetail.copd">
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
            <el-radio-group v-model="caseDetail.exposePoison">
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
            <el-radio-group v-model="caseDetail.relationSuffer">
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
    </el-dialog>
    <!-- 分页底部展示 -->
    <div class="case_footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.page"
        :page-sizes="[10,20,30]"
        :page-size="listQuery.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {pageList,getCaseDetail,exportToExcel} from '@/api/case'
  import {downloadFile} from '@/utils/utils'

  export default {
    name: 'caseIndex',//个案信息
    data() {
      return {
        searchForm: {
          name: '',//姓名
          idNo: '',//身份证
          sex: null,//性别
          minAge: null,//最小年龄
          maxAge: null,//最大年龄
        },//查询条件
        total: 0, // 查询总数
        listQuery: {
          page: 1,
          size: 10
        },
        caseList: [],
        dialogVisible: false,//添加Modal显示隐藏
        caseDetail:{
          name:"",
          sex:0,
          birthday:null,
          nation:"",
          nativePlace:"",
          idNo:"",
          telephone:"",
          emergencyTel:"",
          address:"",
          archiveId:"",
          smookingStatus:0,
          copd:0,
          exposePoison:0,
          relationSuffer:0
        }
      }
    },
    created: function () {
      this.handleSearch()
    },

    methods: {
      //Table复选框选择
      handleSelectionChange(val) {
        console.log("table复选框选择----->>>>", val);
      },

      //   查询
      async handleSearch() {
        Object.assign(this.listQuery,this.searchForm)
        const res = await pageList(this.listQuery)
        this.caseList = res.data.list
        this.total = res.data.total
      },
      // 重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 新增 详情 编辑
      async getCaseDetail(id) {
        const res =  await getCaseDetail(id);
        console.log(res)
        this.caseDetail = res.data
        this.dialogVisible = true
      },
      // 导出
      async handleExport() {
        const res =  await exportToExcel(this.searchForm)
        downloadFile(res,"个案信息.xlsx")
      },
      // 每页加载几条数据
      handleSizeChange(val) {
        this.listQuery.size = val;
        this.handleSearch();
      },
      // 分页-当前页
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.handleSearch();
      },
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


