<template>
  <div class="results-management-writings-index">
    <div class="results-management-writings-piece results-management-writings-form">
      <b>全部 ({{ total }})</b>
      <el-form :inline="true" class="search-form p-r" size="mini">
        <el-form-item>
          <el-button @click="handleAddUser" type="primary">新建</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="results-management-writings-piece">
      <div class="results-management-writings-list">
        <el-table ref="multipleTable" :data="userList" tooltip-effect="dark" style="width: 100%">
          <el-table-column type="index" label="序号" width="250"></el-table-column>
          <el-table-column label="用户名" width="250">
            <template slot-scope="scope">
              {{ scope.row.userName}}
            </template>
          </el-table-column>
          <el-table-column label="姓名" width="250">
            <template slot-scope="scope">
              {{ scope.row.realName}}
            </template>
          </el-table-column>
          <el-table-column prop="telephone" label="联系方式" width="250">
            <template slot-scope="scope">
              {{ scope.row.telephone}}
            </template>
          </el-table-column>
          <el-table-column prop="orgName" label="机构名称" width="250">
            <template slot-scope="scope">
              {{ scope.row.orgName}}
            </template>
          </el-table-column>
          <el-table-column prop="roleName" label="角色名称" width="250">
            <template slot-scope="scope">
              {{ scope.row.roleName}}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="auto">
            <template slot-scope="scope">
              <el-link :underline="false" @click="handleDeleteUser(scope.row)">删除</el-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑用户':'新建用户'">
      <el-form :model="user" label-width="80px" label-position="left">
        <el-form-item v-if="dialogType==='edit'" label="ID">
          <el-input :disabled="true" v-model="user.id"/>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="user.userName"/>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="user.realName"/>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="user.telephone"/>
        </el-form-item>
        <el-form-item label="机构名称">
          <el-input v-model="user.orgName"/>
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input v-model="user.roleName"/>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmUser">确认</el-button>
      </div>
    </el-dialog>
    <!-- 分页底部展示 -->
    <div class="dataModelIndex_footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.page"
        :page-sizes="[10,20,30]"
        :page-size="listQuery.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {getUsers} from '@/api/user'
  const defaultUser = {
    id: null,
    userName: "",
    realName: "",
    telephone: "",
    orgName: "",
    roleName: ""
  }
  export default {
    name: 'userManagement',
    data() {
      return {
        total: 0,
        listLoading: true,
        userList: [],
        user:{},
        dialogVisible: false,
        dialogType: 'new',
        listQuery: {
          page: 1,
          size: 10
        },
      }
    },
    created: function () {
      this.getUsers();
    },
    methods: {
      async getUsers() {
        this.listLoading = true
        const res = await getUsers(this.listQuery)
        this.userList = res.data.list
        this.total = res.data.total
        this.listLoading = false
      },
      handleDeleteUser() {

      },
      handleToAddPage() {

      },
      confirmUser(){
        this.dialogVisible = false

      },
      // 每页加载几条数据
      handleSizeChange(val) {
        this.listQuery.size = val;
        getUsers();
      },
      // 分页-当前页
      handleCurrentChange(val) {
        this.listQuery.page = val;
        getUsers();
      },
      handleAddUser(){
        this.user = Object.assign({}, defaultUser)
        this.dialogType = 'new'
        this.dialogVisible = true
      }
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

  .results-management-writings-piece .input-with-select .el-select .el-input input {
    padding: 0px 10px;
  }

  .results-management-writings-piece .el-date-editor .el-range-separator {
    width: 10%;
  }

  .results-management-writings-piece .el-date-editor--daterange.el-input__inner {
    width: 240px;
  }
</style>
