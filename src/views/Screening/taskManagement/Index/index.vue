<template>
  <div class="taskManagementIndex">
    <!-- 查询搜索项 -->
    <div class="taskManagementIndex_query">
      <el-form
        :inline="true"
        :model="searchForm"
        class="taskManagementIndex_query_from p-l"
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
          label="身份证号码"
          prop="idNo"
        >
          <el-input
            prefix-icon="el-icon-search"
            placeholder="身份证号码"
            v-model="searchForm.idNo"
          />
        </el-form-item>
        <!-- 时间 -->
        <el-form-item
          label="时间"
          prop="date"
        >
          <el-date-picker
            v-model="searchForm.date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <!-- 风险等级 -->
        <el-form-item
          label="风险等级"
          prop="level"
        >
          <el-select
            v-model="searchForm.riskLevel"
            placeholder="请选择风险等级"
          >
            <el-option
              label="无风险"
              value="none"
            >无风险</el-option>
            <el-option
              label="中风险"
              value="medium"
            >中风险</el-option>
            <el-option
              label="高风险"
              value="high"
            >高风险</el-option>
          </el-select>
        </el-form-item>
        <!-- 电话预约情况 -->
        <el-form-item
          label="电话预约情况"
          prop="appointFlag"
        >
          <el-select
            v-model="searchForm.appointFlag"
            placeholder="请选择电话预约情况"
          >
            <el-option
              label="是"
              value="0"
            >是</el-option>
            <el-option
              label="否"
              value="1"
            >否</el-option>
          </el-select>
        </el-form-item>
        <!-- 预约结果 -->
        <el-form-item
          label="预约结果"
          prop="appointResult"
        >
          <el-select
            v-model="searchForm.appointResult"
            placeholder="请选择预约结果"
          >
            <el-option
              label="成功"
              value="success"
            >成功</el-option>
            <el-option
              label="等待"
              value="waiting"
            >等待</el-option>
            <el-option
              label="拒绝"
              value="refuse"
            >拒绝</el-option>
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
          <el-button
            type="success"
            @click="handleExport"
          >导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- table 数据展示 -->
    <div class="taskManagementIndex_table">
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
          prop="riskLevel"
          label="风险等级"
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
          prop="appointFlag"
          label="电话预约情况"
        />
        <el-table-column
          prop="appointResult"
          label="预约结果"
        />
      </el-table>
    </div>
    <!-- 分页底部展示 -->
    <div class="taskManagementIndex_footer">
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
  import {pageList,exportToExcel} from '@/api/highRisk'
  import {downloadFile} from '@/utils/utils'

  export default {
    name: 'taskManagementIndex',//任务管理
    data() {
      return {
        total: 0, // 查询总数
        listQuery: {
          page: 1,
          size: 10
        },
        searchForm: {
          name: '',//姓名
          idNo: '',//身份证号码
          date: [],//日期
          riskLevel: null,//风险等级
          appointFlag: null,//电话预约情况
          appointResult: '',//电话预约结果
        },//查询条件
        caseList: [],//表格数据
        addVisible: false,//添加Modal显示隐藏
      }
    },
    created: function () {
      this.handleSearch()
    },
    methods: {
      // 重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //Table复选框选择
      handleSelectionChange(val) {
        console.log("table复选框选择----->>>>", val);
      },
      //   查询
      async handleSearch() {
        Object.assign(this.listQuery, this.searchForm)
        const res = await pageList(this.listQuery)
        this.caseList = res.data.list
        this.total = res.data.total
      },
      // 自定义指标
      async handleExport() {
        const res =  await exportToExcel(this.searchForm)
        downloadFile(res,"高风险底册.xlsx")
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
.taskManagementIndex {
  .taskManagementIndex_query {
    .taskManagementIndex_query_from {
      background: #fff;
      padding: 12px 16px;
    }
  }
  .taskManagementIndex_table {
    background: #fff;
  }
  .taskManagementIndex_footer {
    margin-top: 10px;
  }
}
</style>
