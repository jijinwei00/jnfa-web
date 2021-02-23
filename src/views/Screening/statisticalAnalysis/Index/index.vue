<template>
  <div class="statistcalAnalysisIndex">
    <!-- 查询搜索项 -->
    <div class="statistcalAnalysis_query">
      <el-form
        :inline="true"
        :model="searchForm"
        class="statistcalAnalysis_query_from p-l"
        size="mini"
        ref="searchForm"
      >
        <!-- 总人口 -->
        <el-form-item label="总人口">
          <el-input
            prefix-icon="el-icon-search"
            placeholder="总人口"
            v-model="searchForm.population"
          />
        </el-form-item>
        <!-- 符合指标 -->
        <el-form-item label="符合指标">
          <el-input
            prefix-icon="el-icon-search"
            placeholder="符合指标"
            v-model="searchForm.indicators"
          />
        </el-form-item>
        <!-- button -->
        <el-form-item>
          <el-button
            type="primary"
            @click="handleSearch"
          >查询</el-button>
          <el-button
            type="success"
            @click="handleExport"
          >导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- table 数据展示 -->
    <div class="statistcalAnalysis_table">
      <el-table
        :data="tableData"
        style="width: 100%"
        max-height="400"
        ref="multipleTable"
        tooltip-effect="dark"
      >
        <el-table-column
          fixed
          prop="key"
          label="序号"
          width="150"
        />
        <el-table-column
          prop="population"
          label="总人口"
          width="150"
        />
        <el-table-column
          prop="indicators"
          label="符合指标"
          width="150"
        />
        <el-table-column
          prop="result"
          label="筛选结果复审"
          width="150"
        />
        <el-table-column
          prop="YesCT"
          label="已做CT"
          width="150"
        />
        <el-table-column
          prop="NoCT"
          label="未做CT"
          width=""
        />
      </el-table>
    </div>
    <!-- 分页底部展示 -->
    <div class="statistcalAnalysis_footer">
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
  name: "statistcalAnalysisIndex", //筛选结果复审
  data() {
    return {
      total: 0, // 查询总数
      pageNum: 1, // 查询分页
      pageSize: 5, // 查询分页
      searchForm: {
        population: "", //总人口
        indicators: "", //符合指标
        result: "", //CT结果
        YesCT: "", //已做CT
        NoCT: "", //未做CT
      }, //查询条件
      tableData: [
        {
          key: "1",
          population: "1000",
          indicators: "999",
          result: "90",
          YesCT: "99",
          NoCT: "100",
        },
        {
          key: "2",
          population: "1000",
          indicators: "999",
          result: "90",
          YesCT: "99",
          NoCT: "100",
        },
        {
          key: "3",
          population: "1000",
          indicators: "999",
          result: "90",
          YesCT: "99",
          NoCT: "100",
        },
        {
          key: "4",
          population: "1000",
          indicators: "999",
          result: "90",
          YesCT: "99",
          NoCT: "100",
        },
        {
          key: "5",
          population: "1000",
          indicators: "999",
          result: "90",
          YesCT: "99",
          NoCT: "100",
        },
        {
          key: "6",
          population: "1000",
          indicators: "999",
          result: "90",
          YesCT: "99",
          NoCT: "100",
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
    // 导出
    handleExport() {
      alert("导出");
    },

    // 每页加载几条数据
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 分页-当前页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>


<style lang="scss" scoped>
.statistcalAnalysisIndex {
  .statistcalAnalysis_query {
    .statistcalAnalysis_query_from {
      background: #fff;
      padding: 12px 16px;
    }
  }
  .statistcalAnalysis_table {
    background: #fff;
  }
  .statistcalAnalysis_footer {
    margin-top: 10px;
  }
}
</style>


