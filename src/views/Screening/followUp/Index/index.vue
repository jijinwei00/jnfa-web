<template>
  <div class="dataQuery">
    <!-- 查询搜索项 -->
    <div class="dataQuery_query">
      <el-form
        :inline="true"
        :model="searchForm"
        class="dataQuery_query_from p-l"
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
    <div class="dataQuery_table">
      <el-table
        :data="caseList"
        style="width: 100%"
        max-height="400"
      >
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
          prop="idNo"
          label="证件号码"
          width="200"
        />
        <el-table-column
          prop="riskLevel"
          label="风险等级"
        />
        <el-table-column
          prop="therapy"
          label="治疗方案"
        />
        <el-table-column
          prop="resultDescription"
          label="CT结果"
          width="280"
        />

        <el-table-column
          prop="doctorAdvice"
          label="医生建议"
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
      </el-table>
    </div>
    <!-- 分页底部展示 -->
    <div class="dataQuery_footer">
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
  import {pageList,exportToExcel} from '@/api/followUp'
  import {downloadFile} from '@/utils/utils'

  export default {
    name: 'followUp',//随访计划
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
          riskLevel: null,//风险等级
          therapy: null
        },
        caseList:[]
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
      //   查询
      async handleSearch() {
        Object.assign(this.listQuery, this.searchForm)
        const res = await pageList(this.listQuery)
        this.caseList = res.data.list
        this.total = res.data.total
      },
      // 导出
      async handleExport() {
        const res =  await exportToExcel(this.searchForm)
        downloadFile(res,"随访计划.xlsx")
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
  .dataQuery {
    .dataQuery_query {
      .dataQuery_query_from {
        background: #fff;
        padding: 12px 16px;
      }
    }
    .dataQuery_table {
      background: #fff;
    }
    .dataQuery_footer {
      margin-top: 10px;
    }
  }
</style>


