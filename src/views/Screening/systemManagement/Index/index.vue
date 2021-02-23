<template>
  <div class="systemManagementIndex">
    <!-- 查询搜索项 -->
    <div class="systemManagement_query">
      <el-form
        :inline="true"
        :model="searchForm"
        class="systemManagement_query_from p-l"
        size="mini"
        ref="searchForm"
      >
        <!-- id -->
        <el-form-item label="ID">
          <el-input
            prefix-icon="el-icon-search"
            placeholder="ID"
            v-model="searchForm.id"
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
            @click="handlePush"
          >推送</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- table 数据展示 -->
    <div class="systemManagement_table">
      <el-table
        :data="tableData"
        style="width: 100%"
        max-height="400"
        ref="multipleTable"
        tooltip-effect="dark"
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
          prop="id"
          label="id"
          width="150"
        />
        <el-table-column
          prop="content"
          label="内容"
          show-overflow-tooltip
          width="450"
        />
        <el-table-column
          fixed="right"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="handleEdit(scope.$index, tableData)"
              type="text"
              size="small"
            >
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页底部展示 -->
    <div class="systemManagement_footer">
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
  name: "systemManagementIndex", //筛选结果复审
  data() {
    return {
      total: 0, // 查询总数
      pageNum: 1, // 查询分页
      pageSize: 5, // 查询分页
      searchForm: {
        id: "", //id
      }, //查询条件
      tableData: [
        {
          key: "1",
          id: "1000",
          content: "天津津南项目人群关注....",
        },
        {
          key: "2",
          id: "1000",
          content: "天津津南项目人群关注....",
        },
        {
          key: "3",
          id: "1000",
          content: "天津津南项目人群关注....",
        },
        {
          key: "4",
          id: "1000",
          content: "天津津南项目人群关注....",
        },
        {
          key: "5",
          id: "1000",
          content: "天津津南项目人群关注....",
        },
        {
          key: "6",
          id: "1000",
          content: "天津津南项目人群关注....",
        },
      ], //table模拟数据
      currentPage: 1,
      total: 100,
    };
  },

  methods: {
    //   编辑
    handleEdit() {
      alert("编辑");
    },
    //   查询
    handleSearch() {
      console.log("查询--->>>>", this.searchForm);
      alert("查询");
    },
    // 推送
    handlePush() {
      alert("推送");
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
    //Table复选框选择
    handleSelectionChange(val) {
      console.log("table复选框选择----->>>>", val);
    },
  },
};
</script>


<style lang="scss" scoped>
.systemManagementIndex {
  .systemManagement_query {
    .systemManagement_query_from {
      background: #fff;
      padding: 12px 16px;
    }
  }
  .systemManagement_table {
    background: #fff;
  }
  .systemManagement_footer {
    margin-top: 10px;
  }
}
</style>


