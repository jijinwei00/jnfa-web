<template>
  <div class="results-management-writings-index">
    <div class="results-management-writings-piece results-management-writings-form">
      <el-form
        :inline="true"
        :model="searchForm"
        class="search-form p-l"
        size="mini"
      >
        <el-form-item label="操作用户名">
          <el-input
            prefix-icon="el-icon-search"
            v-model="searchForm.userName"
            placeholder="操作用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="操作内容">
          <el-input
            prefix-icon="el-icon-search"
            v-model="searchForm.handleName"
            placeholder="操作名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="开始-结束日期">
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
        <el-form-item>
          <el-button
            type="primary"
            @click="handleLogSearch"
          >查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="results-management-writings-piece">
      <div class="results-management-writings-list">
        <el-table
          ref="multipleTable"
          :data="handleLogs"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column
            type="index"
            label="序号"
            width="100"
          ></el-table-column>
          <el-table-column label="用户名">
            <template slot-scope="scope">
              {{ scope.row.userName}}
            </template>
          </el-table-column>
          <el-table-column label="客户端IP">
            <template slot-scope="scope">
              {{ scope.row.userIp}}
            </template>
          </el-table-column>
          <el-table-column label="操作时间">
            <template slot-scope="scope">
              {{ scope.row.handleTime}}
            </template>
          </el-table-column>
          <el-table-column label="操作名称">
            <template slot-scope="scope">
              {{ scope.row.handleName}}
            </template>
          </el-table-column>
        </el-table>
      </div>
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
import { handleLogPageList } from '@/api/systemAPI'

export default {
  name: 'logQuery',
  data() {
    return {
      total: 0,
      searchForm: {
        dateRange: [],
        userName: "",
        handleName: ""
      },
      handleLogs: [],
      listQuery: {
        page: 1,
        size: 10
      }
    }
  },
  created: function () {
    this.handleLogSearch(); // 初始化查询列表
  },
  methods: {
    async handleLogSearch() {
      this.listLoading = true
      Object.assign(this.searchForm, this.listQuery)
      const res = await handleLogPageList(this.searchForm)
      this.handleLogs = res.data.list
      this.total = res.data.total
      this.listLoading = false
    },
    // 每页加载几条数据
    handleSizeChange(val) {
      this.listQuery.size = val;
      this.handleLogSearch();
    },
    // 分页-当前页
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.handleLogSearch();
    },
  }
}
</script>


<style lang="scss" scoped>
.results-management-writings-index {
  padding: 20px;
  background-color: #fff;

  .results-management-writings-piece {
    &.results-management-writings-form {
      height: auto;
      line-height: auto;
      overflow: hidden;
    }

    .results-management-writings-list {
      position: relative;

      // 选择查询结果导出
      .selectTableData {
        width: 100%;
        height: 48px;
        line-height: 48px;
        background-color: #f1f1f1;

        ul {
          overflow: hidden;

          li {
            float: left;
            margin-right: 25px;

            .el-checkbox {
              padding-left: 14px;
            }
          }
        }
      }
    }
  }

  .file-updata-dialog {
    h3 {
      overflow: hidden;
    }

    .product-scoring {
      margin: 10px auto;
      text-align: center;
    }
  }
}

.results-management-writings-piece .input-with-select .el-select .el-input {
  width: 90px;
}

.results-management-writings-piece
  .input-with-select
  .el-select
  .el-input
  input {
  padding: 0px 10px;
}

.results-management-writings-piece .el-date-editor .el-range-separator {
  width: 10%;
}

.results-management-writings-piece .el-date-editor--daterange.el-input__inner {
  width: 240px;
}
</style>
