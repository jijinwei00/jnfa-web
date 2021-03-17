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
          label="家庭医生"
          prop="doctor"
        >
          <el-select
            v-model="searchForm.doctor"
            placeholder="请选择医生账号"
          >
            <el-option
              v-for="doctor in doctorList"
              :key="doctor.name"
              :label="doctor.name"
              :value="doctor.id"/>
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
        </el-form-item>
      </el-form>
    </div>
    <!-- table 数据展示 -->
    <div class="statistcalAnalysis_table">
      <el-table
        :data = "riskList"
        style="width: 100%"
        max-height="400"
        ref="multipleTable"
        tooltip-effect="dark"
        :header-cell-style="{textAlign: 'center'}"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column label="序号"><el-table-row></el-table-row></el-table-column>
        <el-table-column label="收集患者总数"></el-table-column>
        <el-table-column label="风险底册">
          <el-table-column label="总数"></el-table-column>
          <el-table-column label="无风险"></el-table-column>
          <el-table-column label="中风险"></el-table-column>
          <el-table-column label="高风险"></el-table-column>
        </el-table-column>
        <el-table-column label="已提交肺癌筛查中心"></el-table-column>
        <el-table-column label="已提交患者"></el-table-column>
      </el-table>
      <el-table
        :data = "therapyList"
        style="width: 100%"
        max-height="400"
        ref="multipleTable"
        tooltip-effect="dark"
        :header-cell-style="{textAlign: 'center'}"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column label="序号"></el-table-column>
        <el-table-column label="风险类型">
          <el-table-column label="无"></el-table-column>
          <el-table-column label="中"></el-table-column>
          <el-table-column label="高"></el-table-column>
        </el-table-column>
        <el-table-column label="治疗方案">
          <el-table-column label="保守"></el-table-column>
          <el-table-column label="手术"></el-table-column>
          <el-table-column label="观察"></el-table-column>
        </el-table-column>
      </el-table>
      <el-table
        :data = "followupList"
        style="width: 100%"
        max-height="400"
        ref="multipleTable"
        tooltip-effect="dark"
        :header-cell-style="{textAlign: 'center'}"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column label="序号"></el-table-column>
        <el-table-column label="风险类型">
          <el-table-column label="无"></el-table-column>
          <el-table-column label="中"></el-table-column>
          <el-table-column label="高"></el-table-column>
        </el-table-column>
        <el-table-column label="随访状态">
          <el-table-column label="失访"></el-table-column>
          <el-table-column label="脱访"></el-table-column>
          <el-table-column label="完成"></el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {familyDoctorList} from '@/api/user'
  import {riskProgress,therapyProgress,followupProgress} from '@/api/workProgress'

  export default {
    name: "workProgress", //工作进度
    data() {
      return {
        searchForm: {
          date: null, //日期
          doctor: "", //医生账号
        },
        riskList: [],
        therapyList: [],
        followupList: [],
        doctorList: []
      };
    },
    created: function () {
      this.familyDoctorList();
    },

    methods: {
      //   查询
      handleSearch() {
        console.log("查询--->>>>", this.searchForm);
        alert("查询");
      },
      async familyDoctorList(){
        const res = await familyDoctorList();
        this.doctorList = res.data;
      },
      // 重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 导出
      handleExport() {
        alert("导出");
      }
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


