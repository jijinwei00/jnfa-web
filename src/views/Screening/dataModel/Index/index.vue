<template>
  <div class="dataModelIndex">
    <!-- 查询搜索项 -->
    <div class="dataModelIndex_query">
      <el-form
        :inline="true"
        class="dataModelIndex_query_from p-r"
        size="mini"
        ref="searchForm"
      >
        <!-- button -->
        <el-form-item>
          <el-button
            type="primary"
            @click="indicatorListSearch"
          >查询</el-button>
          <!-- 添加 -->
          <add-modal/>
        </el-form-item>
      </el-form>
    </div>
    <!-- table 数据展示 -->
    <div class="dataModelIndex_table">
      <el-table
        :data="indicatorList"
        style="width: 100%"
        max-height="400"
      >
        <el-table-column
          type="index"
          label="序号"
          width="100"
        />
        <el-table-column
          prop="subject"
          label="主题"
          width="300">
          <template slot-scope="scope">
            {{ scope.row.subject}}
          </template>
        </el-table-column>
        <el-table-column
          prop="minAge"
          label="最小年龄"
          width="200">
          <template slot-scope="scope">
            {{ scope.row.minAge}}
          </template>
        </el-table-column>
        <el-table-column
          prop="maxAge"
          label="最大年龄"
          width="200">
          <template slot-scope="scope">
            {{ scope.row.maxAge}}
          </template>
        </el-table-column>
        <el-table-column
          prop="manageOrg"
          label="管理机构"
          width="300">
          <template slot-scope="scope">
            {{ scope.row.manageOrg}}
          </template>
        </el-table-column>
        <el-table-column
          prop="smoke"
          label="吸烟"
          width="200">
          <template slot-scope="scope">
            {{ scope.row.smoke}}
          </template>
        </el-table-column>
        <el-table-column
          prop="manageOrg"
          label="被动吸烟"
          width="200">
          <template slot-scope="scope">
            {{ scope.row.passiveSmoking}}
          </template>
        </el-table-column>
        <el-table-column
          prop="manageOrg"
          label="有职业暴露史者"
          width="200">
          <template slot-scope="scope">
            {{ scope.row.exposeHis}}
          </template>
        </el-table-column>
        <el-table-column
          prop="pastMaliGnant"
          label="有恶性肿瘤病史"
          width="200">
          <template slot-scope="scope">
            {{ scope.row.pastMaliGnant}}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="handleElete(scope.row.id)"
              type="text"
              size="small"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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
  import { postIndicatorPageList,postIndicatordDelete } from '@/api/screeningAPI'

  export default {
    name: 'dataModelIndex',//数据模型指标设置
    data() {
      return {
        total: 0, // 查询总数
        indicatorList: [],//table模拟数据
        listQuery: {
          page: 1,
          size: 10
        }
      }
    },
    created: function () {
      this.indicatorListSearch(); // 初始化查询列表
    },

    methods: {
      //   查询
      async indicatorListSearch() {
        this.listLoading = true
        const res = await postIndicatorPageList(this.listQuery)
        this.indicatorList = res.data.list
        this.total = res.data.total
        this.listLoading = false
      },
      // 移除
      async handleElete(id) {
        await postIndicatordDelete(id);
        this.$message({
          message: '删除成功!',
          type: 'success'
        });
      },
      // 每页加载几条数据
      handleSizeChange(val) {
        this.listQuery.size = val;
        this.indicatorListSearch();
      },
      // 分页-当前页
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.indicatorListSearch();
      }
    }
  }
</script>


<style lang="scss" scoped>
  .dataModelIndex {
    .dataModelIndex_query {
      .dataModelIndex_query_from {
        background: #fff;
        padding: 12px 16px;
      }
    }

    .dataModelIndex_table {
      background: #fff;
    }

    .dataModelIndex_footer {
      margin-top: 10px;
    }
  }
</style>


