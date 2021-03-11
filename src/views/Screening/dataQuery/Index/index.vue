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
          prop="idCard"
        >
          <el-input
            prefix-icon="el-icon-search"
            placeholder="身份证"
            v-model="searchForm.idCard"
          />
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
        <!-- 治疗方案 -->
        <el-form-item
          label="治疗方案"
          prop="plan"
        >
          <el-select
            v-model="searchForm.plan"
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
        :data="tableData"
        style="width: 100%"
        max-height="400"
      >
        <el-table-column
          fixed
          prop="key"
          label="序号"
          width="80"
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
          prop="idCard"
          label="证件号码"
          width="200"
        />
        <el-table-column
          prop="level"
          label="风险等级"
        />
        <el-table-column
          prop="plan"
          label="治疗方案"
        />
        <el-table-column
          prop="CT"
          label="CT结果"
          width="280"
        />

        <el-table-column
          prop="advice"
          label="医生建议"
        />
        <el-table-column
          prop="doctor"
          label="医生姓名"
        />
        <el-table-column
          prop="telephone"
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
    name: 'dataQueryIndex',//随访计划
    data() {
      return {
        total: 0, // 查询总数
        pageNum: 1, // 查询分页
        pageSize: 5, // 查询分页
        searchForm: {
          name: '',//姓名
          idCard: '',//身份证
          level: '',//风险等级
          plan: '',//治疗方案
        },//查询条件
        tableData: [{
          key: '1',
          name: '测试',
          idCard: '231084199601291615',
          sex: '男',
          telephone: '17644885599',
          level: '高风险',
          plan: '手术治疗',
          CT: '结节大于6mm小于15mm',
          advice: '立即手术',
          doctor: '张医生',
        }, {
          key: '2',
          name: '测试1',
          idCard: '231084199601291615',
          sex: '女',
          telephone: '17644885599',
          level: '高风险',
          plan: '手术治疗',
          CT: '结节大于6mm小于15mm',
          advice: '立即手术',
          doctor: '张医生',

        }, {
          key: '3',
          name: '测试',
          idCard: '231084199601291615',
          sex: '男',
          telephone: '17644885599',
          level: '高风险',
          plan: '手术治疗',
          CT: '结节大于6mm小于15mm',
          advice: '立即手术',
          doctor: '张医生',

        }, {
          key: '4',
          name: '测试',
          idCard: '231084199601291615',
          sex: '男',
          telephone: '17644885599',
          level: '高风险',
          plan: '手术治疗',
          CT: '结节大于6mm小于15mm',
          advice: '立即手术',
          doctor: '张医生',

        }, {
          key: '5',
          name: '测试',
          idCard: '231084199601291615',
          sex: '男',
          telephone: '17644885599', level: '高风险',
          plan: '手术治疗',
          CT: '结节大于6mm小于15mm',
          advice: '立即手术',
          doctor: '张医生',

        },],//table模拟数据
        currentPage: 1,
        total: 100,
      }
    },

    methods: {
      // 重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 查看详情
      handleTabClick(tab, event) {
        console.log('Tab', tab, event);
      },
      //   查询
      handleSearch() {
        console.log('查询--->>>>', this.searchForm);
        alert('查询')
      },
      // 导出
      handleExport() {
        alert('导出')
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


