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
        <!-- 工作进度 -->
        <el-form-item
          label="工作进度"
          prop="plan"
        >
          <el-select
            v-model="searchForm.plan"
            placeholder="请选择工作进度"
            @change="onSelectPlan"
          >
            <el-option
              label="高风险底册"
              value="0"
            >高风险底册</el-option>
            <el-option
              label="随访计划"
              value="1"
            >随访计划</el-option>
            <el-option
              label="随访任务"
              value="2"
            >随访任务</el-option>
          </el-select>
        </el-form-item>
        <!-- 日期 -->
        <el-form-item
          label="日期"
          prop="date"
        >
          <el-date-picker
            v-model="searchForm.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <!-- 医生账号 -->
        <el-form-item
          label="医生账号"
          prop="doctor"
        >
          <el-select
            v-model="searchForm.doctor"
            placeholder="请选择医生账号"
          >
            <el-option
              label="张医生"
              value="0"
            >张医生</el-option>
            <el-option
              label="刘医生"
              value="1"
            >刘医生</el-option>
            <el-option
              label="李医生"
              value="2"
            >李医生</el-option>
          </el-select>
        </el-form-item>
        <!-- button -->
        <el-form-item>
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
    <div class="statistcalAnalysis_table">
      <el-table
        :data="tableData"
        style="width: 100%"
        max-height="400"
        ref="multipleTable"
        tooltip-effect="dark"
        :header-cell-style="{textAlign: 'center'}"
        :cell-style="{ textAlign: 'center' }"
      >
        <template v-for="(item) in tableColumList">
          <el-table-column
            :key="item.key"
            :prop="item.key"
            :label="item.val"
          >
            <template v-for="(ele) in item.children">
              <el-table-column
                :key="ele.key"
                :prop="ele.key"
                :label="ele.val"
              />
            </template>
          </el-table-column>
        </template>

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
  name: "statistcalAnalysisIndex", //工作进度
  data() {
    return {
      total: 0, // 查询总数
      pageNum: 1, // 查询分页
      pageSize: 5, // 查询分页
      searchForm: {
        date: "", //日期
        doctor: "", //医生账号
        plan: '0',//工作进度
      }, //查询条件
      tableColumList: [{ key: 'index', val: '序号', children: [] }, { key: 'sum', val: '收集者总数', children: [] }, { key: 'fxdc', val: '风险底册', children: [{ key: 'zs', val: '总数' }, { key: 'wu', val: '无风险' }, { key: 'zhong', val: '中风险' }, { key: 'gao', val: '高风险' }] }, { key: 'fa', val: '已提交肺癌中心', children: [] }, { key: 'wtj', val: '未提交患者', children: [] }, { key: 'qt', val: '其他', children: [] }],//table表头
      tableData: [
        {
          index: "1",

        },
        {
          index: "2",

        },
        {
          index: "3",

        },
        {
          index: "4",

        },
        {
          index: "5",

        },
        {
          index: "6",

        },
      ], //table模拟数据
      currentPage: 1,
      total: 100,
    };
  },

  methods: {
    // 工作进度select
    onSelectPlan(val) {
      let dataList1 = [{ key: 'index', val: '序号', children: [] }, { key: 'sum', val: '收集者总数', children: [] }, { key: 'fxdc', val: '风险底册', children: [{ key: 'zs', val: '总数' }, { key: 'wu', val: '无风险' }, { key: 'zhong', val: '中风险' }, { key: 'gao', val: '高风险' }] }, { key: 'fa', val: '已提交肺癌中心', children: [] }, { key: 'wtj', val: '未提交患者', children: [] }, { key: 'qt', val: '其他', children: [] }]//高风险底册
      let dataList2 = [{ key: 'index', val: '序号', children: [] }, { key: 'fxlx', val: '风险类型', children: [{ key: 'wu', val: '无' }, { key: 'zhong', val: '中' }, { key: 'gao', val: '高' }] }, { key: 'zlfa', val: '治疗方案', children: [{ key: 'bs', val: '保守' }, { key: 'ss', val: '手术' }, { key: 'gc', val: '观察' }] }]//随访计划
      let dataList3 = [{ key: 'index', val: '序号', children: [] }, { key: 'fxlx', val: '风险类型', children: [{ key: 'wu', val: '无' }, { key: 'zhong', val: '中' }, { key: 'gao', val: '高' }] }, { key: 'zlfa', val: '治疗方案', children: [{ key: 'bs', val: '保守' }, { key: 'ss', val: '手术' }, { key: 'gc', val: '观察' }] }, { key: 'sfzt', val: '随访状态', children: [{ key: 'sf', val: '已随访' }, { key: 'tf', val: '脱访' }, { key: 'sf', val: '失访' }] }]//随访任务
      if (val == '0') { this.tableColumList = dataList1 }
      if (val == '1') { this.tableColumList = dataList2 }
      if (val == '2') { this.tableColumList = dataList3 }
    },
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


