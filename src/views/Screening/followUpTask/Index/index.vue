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
          prop="idNo"
        >
          <el-input
            prefix-icon="el-icon-search"
            placeholder="证件号码"
            v-model="searchForm.idNo"
          />
        </el-form-item>
        <!-- 结节 -->
        <el-form-item
          label="结节"
          prop="nodeSize"
        >
          <el-select
            v-model="searchForm.nodeSize"
            placeholder="请选择结节大小"
          >
            <el-option
              label="小于6"
              value="<6"
            >小于6</el-option>
            <el-option
              label="大于6小于15"
              value=">6"
            >大于6小于15</el-option>
            <el-option
              label="大于15"
              value=">15"
            >大于15</el-option>
          </el-select>
        </el-form-item>
        <!-- 治疗方案 -->
        <el-form-item
          label="治疗方案"
          prop="therapy"
        >
          <el-select
            v-model="searchForm.therapy"
            placeholder="请选择治疗方案"
          >
            <el-option
              label="保守治疗"
              value="reserved"
            >保守治疗</el-option>
            <el-option
              label="手术治疗"
              value="surgery"
            >手术治疗</el-option>
            <el-option
              label="观察治疗"
              value="watch"
            >观察治疗</el-option>
          </el-select>
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
              value="created"
            >未随访</el-option>
            <el-option
              label="已分配"
              value="assignTask"
            >已分配</el-option>
            <el-option
              label="失访"
              value="lost"
            >失访</el-option>
            <el-option
              label="脱访"
              value="offline"
            >脱访</el-option>
            <el-option
              label="完成"
              value="finished"
            >完成</el-option>
          </el-select>
        </el-form-item>
         <!-- 是否已经到筛查中心报道并完成CT检查 -->
        <el-form-item
          label="是否已经到筛查中心报道并完成CT检查"
          prop="CT"
        >
          <el-select
            v-model="searchForm.CT"
            placeholder="请选择是否已经到筛查中心报道并完成CT检查"
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
        :data="caseList"
        style="width: 100%"
        max-height="400"
        ref="multipleTable"
        tooltip-effect="dark"
      >
        <el-table-column
          type="index"
          label="序号"
          fixed
        ></el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120"
        />
        <el-table-column
          prop="idNo"
          label="证件号码"
          width="200"
        />
        <el-table-column
          prop="sex"
          label="性别"
        />
        <el-table-column
          prop="resultDescription"
          label="CT结果"
          width="280"
        />
        <el-table-column
          prop="therapy"
          label="治疗方案"
        />
        <el-table-column
          prop="doctorAdvice"
          label="医生建议"
          width="180"
        />
        <el-table-column
          prop="doctorName"
          label="医生姓名"
        />
        <el-table-column
          prop="doctorTel"
          label="联系方式"
          width="150"
        />
        <el-table-column
          prop="status"
          label="随访状态"
          width=""
        />
         <el-table-column
          prop="CT"
          label="是否已经到筛查中心报道并完成CT检查"
          width="280"
        />
      </el-table>
    </div>
    <!-- 分页底部展示 -->
    <div class="dataModelIndex_footer">
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
  import {taskPageList, exportTaskToExcel} from '@/api/followUp'
  import {downloadFile} from '@/utils/utils'

  export default {
    name: "followUpTask", //随访任务
    data() {
      return {
        total: 0, // 查询总数
        listQuery: {
          page: 1,
          size: 10
        },
        searchForm: {
          name: '',//姓名
          idNo: '',//证件号码
          nodeSize: '',//结节
          therapy: "", //治疗方案
          riskLevel: "", //风险等级
          status: '',//随访状态
          CT:'',//是否已经到筛查中心报道并完成CT检查
        }, //查询条件
        caseList: []//表单数据
      };
    },
    created: function () {
      this.handleSearch()
    },
    methods: {
      //   查询
      async handleSearch() {
        Object.assign(this.listQuery, this.searchForm)
        const res = await taskPageList(this.listQuery)
        this.caseList = res.data.list
        this.total = res.data.total
      },
      // 重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 导出
      async handleExport() {
        const res = await exportTaskToExcel(this.searchForm)
        downloadFile(res, "随访任务.xlsx")
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


