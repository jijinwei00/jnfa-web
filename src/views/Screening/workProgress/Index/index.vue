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
            v-model="searchForm.dateRange"
            value-format="yyyy-MM-dd"
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
            v-model="searchForm.doctorId"
            placeholder="请选择医生账号"
          >
            <el-option
              v-for="doctor in doctorList"
              :key="doctor.name"
              :label="doctor.name"
              :value="doctor.id"/>
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
        :data = "riskData"
        style="width: 100%"
        max-height="400"
        ref="multipleTable"
        tooltip-effect="dark"
        :header-cell-style="{textAlign: 'center'}"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column label="收集患者总数" prop="sumCount"></el-table-column>
        <el-table-column label="风险底册">
          <el-table-column label="总数" prop="riskCount"></el-table-column>
          <el-table-column label="无风险" prop="noneRiskCount"></el-table-column>
          <el-table-column label="中风险" prop="mediumRiskCount"></el-table-column>
          <el-table-column label="高风险" prop="highRiskCount"></el-table-column>
        </el-table-column>
        <el-table-column label="已提交肺癌筛查中心"></el-table-column>
        <el-table-column label="已提交患者"></el-table-column>
         <el-table-column label="是否已经到筛查中心报道并完成CT检查">
          <el-table-column label="是"></el-table-column>
          <el-table-column label="否"></el-table-column>
        </el-table-column>
      </el-table>
      <el-table
        :data = "therapyData"
        style="width: 100%"
        max-height="400"
        ref="multipleTable"
        tooltip-effect="dark"
        :header-cell-style="{textAlign: 'center'}"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column label="风险类型">
          <el-table-column label="无" prop="noneRiskCount"></el-table-column>
          <el-table-column label="中" prop="mediumRiskCount"></el-table-column>
          <el-table-column label="高" prop="highRiskCount"></el-table-column>
        </el-table-column>
        <el-table-column label="治疗方案">
          <el-table-column label="保守" prop="reservedCount"></el-table-column>
          <el-table-column label="手术" prop="surgeryCount"></el-table-column>
          <el-table-column label="观察" prop="watchCount"></el-table-column>
        </el-table-column>
          <el-table-column label="是否已经到筛查中心报道并完成CT检查">
          <el-table-column label="是"></el-table-column>
          <el-table-column label="否"></el-table-column>
        </el-table-column>
      </el-table>
      <el-table
        :data = "followupData"
        style="width: 100%"
        max-height="400"
        ref="multipleTable"
        tooltip-effect="dark"
        :header-cell-style="{textAlign: 'center'}"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column label="风险类型">
          <el-table-column label="无" prop="noneRiskCount"></el-table-column>
          <el-table-column label="中" prop="mediumRiskCount"></el-table-column>
          <el-table-column label="高" prop="highRiskCount"></el-table-column>
        </el-table-column>
        <el-table-column label="随访状态">
          <el-table-column label="失访" prop="lostCount"></el-table-column>
          <el-table-column label="脱访" prop="offlineCount"></el-table-column>
          <el-table-column label="完成" prop="finishedCount"></el-table-column>
        </el-table-column>
          <el-table-column label="是否已经到筛查中心报道并完成CT检查">
          <el-table-column label="是"></el-table-column>
          <el-table-column label="否"></el-table-column>
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
          CT:'',
        },
        riskData: [],
        therapyData: [],
        followupData: [],
        doctorList: []
      };
    },
    created: function () {
      this.familyDoctorList();
      this.handleSearch();
    },

    methods: {
      //   查询
      async handleSearch() {
        const riskRes = await riskProgress(this.searchForm);
        this.riskData = riskRes.data;
        const therapyRes = await therapyProgress(this.searchForm);
        this.therapyData = therapyRes.data;
        const followRes = await followupProgress(this.searchForm);
        this.followupData = followRes.data;
      },
      async familyDoctorList(){
        const res = await familyDoctorList();
        this.doctorList = res.data;
      },
      // 重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
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


