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
          prop="idCard"
        >
          <el-input
            prefix-icon="el-icon-search"
            placeholder="身份证号码"
            v-model="searchForm.idCard"
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
        <!-- 电话预约情况 -->
        <el-form-item
          label="电话预约情况"
          prop="appointment"
        >
          <el-select
            v-model="searchForm.appointment"
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
          prop="appointmentRusult"
        >
          <el-select
            v-model="searchForm.appointmentRusult"
            placeholder="请选择预约结果"
          >
            <el-option
              label="成功"
              value="0"
            >成功</el-option>
            <el-option
              label="等待"
              value="1"
            >等待</el-option>
            <el-option
              label="拒绝"
              value="2"
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
            @click="submit"
          >提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- table 数据展示 -->
    <div class="taskManagementIndex_table">
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
          width="150"
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
          prop="level"
          label="风险等级"
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
          prop="appointment"
          label="电话预约情况"
        />
        <el-table-column
          prop="appointmentRusult"
          label="预约结果"
        />
      </el-table>
    </div>
    <!-- 分页底部展示 -->
    <div class="taskManagementIndex_footer">
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
  </div>

</template>

<script>
export default {
  name: 'taskManagementIndex',//任务管理
  data() {
    return {
      total: 0, // 查询总数
      pageNum: 1, // 查询分页
      pageSize: 5, // 查询分页
      searchForm: {
        date: '',//时间
        level: '',//等级
        name: '',//姓名
        idCard: '',//身份证号码
        appointment: '',//电话预约情况
        appointmentRusult: '',//电话预约结果
      },//查询条件
      tableData: [{
        key: '1',
        level: '高风险',
        name: '张三',
        sex: '男',
        idCardType: '居民身份证',
        idCard: '231086199602129151',
        appointment: '是',
        appointmentRusult: '成功',
      }, {
        key: '2',
        level: '高风险',
        name: '张三',
        sex: '男',
        idCardType: '居民身份证',
        idCard: '231086199602129151',
        appointment: '是',
        appointmentRusult: '成功',
      }, {
        key: '3',
        level: '高风险',
        name: '张三',
        sex: '男',
        idCardType: '居民身份证',
        idCard: '231086199602129151',
        appointment: '是',
        appointmentRusult: '等待',
      }, {
        key: '4',
        level: '高风险',
        name: '张三',
        sex: '男',
        idCardType: '居民身份证',
        idCard: '231086199602129151',
        appointment: '是',
        appointmentRusult: '等待',
      }, {
        key: '5',
        level: '高风险',
        name: '张三',
        sex: '男',
        idCardType: '居民身份证',
        idCard: '231086199602129151',
        appointment: '是',
        appointmentRusult: '拒绝',
      }, {
        key: '6',
        level: '高风险',
        name: '张三',
        sex: '男',
        idCardType: '居民身份证',
        idCard: '231086199602129151',
        appointment: '是',
        appointmentRusult: '等待',
      }],//table模拟数据
      currentPage: 1,
      total: 100,
      addVisible: false,//添加Modal显示隐藏
    }
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
    handleSearch() {
      console.log('查询--->>>>', this.searchForm);
      alert('查询')
    },
    // 自定义指标
    submit() {
      alert('新建任务')
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