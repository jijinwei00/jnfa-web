<template>
  <div class="highDataQueryIndex">
    <!-- 查询搜索项 -->
    <div class="highDataQueryIndex_query">
      <el-form
        :inline="true"
        :model="searchForm"
        class="highDataQueryIndex_query_from p-l"
        size="mini"
        ref="searchForm"
      >
        <!-- 随访指标 -->
        <el-form-item label="随访指标">
          <el-input
            prefix-icon="el-icon-search"
            placeholder="随访指标"
            v-model="searchForm.subjectName"
          />
        </el-form-item>
        <!-- 随访计划 -->
        <el-form-item label="随访计划">
          <el-input
            prefix-icon="el-icon-search"
            placeholder="随访计划"
            v-model="searchForm.content"
          />
        </el-form-item>
        <!-- 随访任务 -->
        <el-form-item label="随访任务">
          <el-input
            prefix-icon="el-icon-search"
            placeholder="随访任务"
            v-model="searchForm.content"
          />
        </el-form-item>

        <!-- button -->
        <el-form-item>
          <!-- 导出 -->
          <el-button
            @click="handleExport"
            type="primary"
          >导出</el-button>
          <el-button
            type="primary"
            @click="handleSearch"
          >查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- table 数据展示 -->
    <div class="highDataQueryIndex_table">
      <el-table
        :data="tableData"
        style="width: 100%"
        max-height="400"
      >
        <el-table-column
          fixed
          prop="key"
          label="序号"
          width="150"
        />

        <el-table-column
          prop="Id"
          label="ID"
          width="150"
        />
        <el-table-column
          prop="subjectName"
          label="姓名"
          width="200"
        />
        <el-table-column
          prop="sex"
          label="性别"
          width="150"
        />
        <el-table-column
          prop="content"
          label="身份证"
          width="300"
        />
        <el-table-column
          fixed="right"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="handleDetails(scope.$index, tableData)"
              type="text"
              size="small"
            >
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页底部展示 -->
    <div class="highDataQueryIndex_footer">
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
    <!-- 详情Modal -->
    <el-dialog
      title="审批"
      :visible.sync="detailsVisible"
    >
      <el-form
        :model="detailsForm"
        label-position="left"
        ref="detailsForm"
        :inline="true"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名：">
              <el-input
                disabled
                v-model="detailsForm.name"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别：">
              <el-input
                disabled
                v-model="detailsForm.sex"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="身份证号：">
              <el-input
                disabled
                v-model="detailsForm.idCard"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="ID：">
              <el-input
                disabled
                v-model="detailsForm.id"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="detailsVisible=false"
          type="primary"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'highDataQueryIndex',//任务管理
  data() {
    return {
      total: 0, // 查询总数
      pageNum: 1, // 查询分页
      pageSize: 5, // 查询分页
      searchForm: {
        subjectName: '',//姓名
        content: '',//身份证
        sex: '',//性别
      },//查询条件
      tableData: [{
        key: '1',
        Id: 'A001',
        sex: '男',
        subjectName: '课题1',
        content: '测试',
      }, {
        key: '2',
        Id: 'A001',
        sex: '男',
        subjectName: '课题1',
        content: '测试',
      }, {
        key: '3',
        Id: 'A001',
        sex: '男',
        subjectName: '课题1',
        content: '测试',
      }, {
        key: '4',
        Id: 'A001',
        sex: '男',
        subjectName: '课题1',
        content: '测试',
      }, {
        key: '5',
        Id: 'A001',
        sex: '男',
        subjectName: '课题1',
        content: '测试',
      }, {
        key: '6',
        Id: 'A001',
        sex: '男',
        subjectName: '课题1',
        content: '测试',
      }],//table模拟数据
      currentPage: 1,
      total: 100,
      detailsVisible: false,//详情Modal显示隐藏
      detailsForm: {
        name: '张三',
        sex: '男',
        idCard: '110132654891651239',
        id: 'A001'
      },//详情form表单数据
    }
  },

  methods: {
    //   查询
    handleSearch() {
      console.log('查询--->>>>', this.searchForm);
      alert('查询')
    },
    // 导出
    handleExport() {
      alert('导出')
    },
    // 启动
    handleStart() {
      alert('启动')
    },
    // 停止
    handleStop() {
      alert('停止')
    },
    // 删除
    handleDelete() {
      alert('删除')
    },
    // 每页加载几条数据
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 分页-当前页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 详情
    handleDetails(index, record) {
      this.detailsVisible = true
      console.log('详情---->>>>>', record);
    }
  }
}
</script>


<style lang="scss" scoped>
.highDataQueryIndex {
  .highDataQueryIndex_query {
    .highDataQueryIndex_query_from {
      background: #fff;
      padding: 12px 16px;
    }
  }
  .highDataQueryIndex_table {
    background: #fff;
  }
  .highDataQueryIndex_footer {
    margin-top: 10px;
  }
}
</style>


