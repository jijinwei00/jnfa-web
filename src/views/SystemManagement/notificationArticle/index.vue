<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddArticle">增加</el-button>
    <el-table :data="articleList" style="width: 100%;margin-top:30px;" border>
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column align="center" label="标题" width="220">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="作者" width="220">
        <template slot-scope="scope">
          {{ scope.row.author }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑文章':'新建文章'">
      <el-form :model="article" label-width="80px" label-position="left">
        <el-form-item v-if="dialogType==='edit'" label="ID">
          <el-input :disabled="true" v-model="article.id"/>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="article.title"/>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="article.author"/>
        </el-form-item>
        <el-form-item label="内容">
          <tinymce v-model="article.content" :height="300"/>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmArticle">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getArticles, confirmArticle, deleteArticle} from '@/api/article'
  import {deepClone} from '@/utils/utils'
  import Tinymce from '@/components/Tinymce'

  const defaultArticle = {
    title: '',
    author: '',
    content: ''
  }

  export default {
    components: {Tinymce},
    data() {
      return {
        article: Object.assign({}, defaultArticle),
        articleList: [],
        dialogVisible: false,
        dialogType: 'new',
        checkStrictly: false,
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          size: 10
        },
        defaultProps: {
          children: 'children',
          label: 'title'
        },
      }
    },
    created() {
      // Mock: get all routes and roles list from server
      this.getArticles()
    },
    methods: {
      async getArticles() {
        this.listLoading = true
        const res = await getArticles(this.listQuery)
        this.articleList = res.data.list
        this.total = res.data.total
        this.listLoading = false
      },
      handleAddArticle() {
        this.article = Object.assign({}, defaultArticle)
        if (this.$refs.tree) {
          this.$refs.tree.setCheckedNodes([])
        }
        this.dialogType = 'new'
        this.dialogVisible = true
      },
      async confirmArticle() {
        await confirmArticle(this.article)
        const res = await getArticles(this.listQuery)
        this.articleList = res.data.list
        this.total = res.data.total
        this.dialogVisible = false
      },
      handleEdit(scope) {
        this.dialogType = 'edit'
        this.dialogVisible = true
        this.checkStrictly = true
        this.article = deepClone(scope.row)
      },
      async handleDelete(scope) {
        console.log(scope.row.id)
        await deleteArticle(scope.row.id)
        const res = await getArticles(this.listQuery)
        this.articleList = res.data.list
        this.total = res.data.total
      },
      // 每页加载几条数据
      handleSizeChange(val) {
        this.listQuery.size = val;
        this.getArticles();
      },
      // 分页-当前页
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getArticles();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-container {
    .roles-table {
      margin-top: 30px;
    }

    .permission-tree {
      margin-bottom: 30px;
    }
  }
</style>
