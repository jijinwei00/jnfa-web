<template>
  <div class="results-management-writings-index">
    <div class="results-management-writings-piece results-management-writings-form">
      <el-form
        :inline="true"
        :model="searchForm"
        class="search-form p-l"
        size="mini"
      >
        <el-form-item label="用户名">
          <el-input
            prefix-icon="el-icon-search"
            v-model="searchForm.userName"
            placeholder="用户名"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="getUsers"
          >查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="results-management-writings-piece results-management-writings-form">
      <el-form
        :inline="true"
        class="search-form p-l"
        size="mini"
      >
        <el-form-item>
          <el-button
            @click="handleAddUser"
            type="primary"
          >新建</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="results-management-writings-piece">
      <div class="results-management-writings-list">
        <el-table
          ref="multipleTable"
          :data="userList"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column
            type="index"
            label="序号"
            fixed
          ></el-table-column>
          <el-table-column
            label="用户名"
            prop="userName"
          />
          <el-table-column
            label="姓名"
            prop="realName"
          />
          <el-table-column
            label="身份证号"
            prop="idNo"
          />
          <el-table-column
            label="联系方式"
            prop="telephone"
          />
          <el-table-column
            prop="orgName"
            label="机构名称"
          />
          <el-table-column
            prop="roleName"
            label="角色名称"
          />
          <el-table-column
            prop="comment"
            label="备注"
          />
          <el-table-column
            label="操作"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click.native.prevent="handleDeleteUser(scope.$index, scope.row)"
              >删除</el-button>
              <el-button
                type="text"
                size="small"
                @click.native.prevent="editPermission(scope.row.id)"
              >分配权限</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogType==='edit'?'编辑用户':'新建用户'"
    >
      <el-form
        :model="user"
        label-width="80px"
        label-position="left"
      >
        <el-form-item
          v-if="dialogType==='edit'"
          label="ID"
        >
          <el-input
            :disabled="true"
            v-model="user.id"
          />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="user.userName" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="user.realName" />
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="user.idNo" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="user.passWord"
            show-password
          />
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="user.telephone" />
        </el-form-item>
        <el-form-item label="机构">
          <el-select
            v-model="user.orgId"
            placeholder="请选择"
          >
            <el-option
              v-for="org in orgList"
              :key="org.id"
              :label="org.name"
              :value="org.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色">
          <el-select
            v-model="user.roleId"
            placeholder="请选择"
          >
            <el-option
              v-for="role in roleList"
              :key="role.id"
              :label="role.name"
              :value="role.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="user.comment" />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type=""
          @click="dialogVisible=false"
        >取消</el-button>
        <el-button
          type="primary"
          @click="confirmUser"
        >确认</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="permissionVisible"
      :title="'分配权限'"
    >
      <el-form
        :model="user"
        label-width="80px"
        label-position="left"
      >
        <el-form-item label="权限树">
          <el-tree
            :data="permissionTree"
            checkStrictly
            show-checkbox
            default-expand-all
            :default-checked-keys="permissionIds"
            node-key="value"
            ref="tree"
            highlight-current
            :props="defaultProps">
          </el-tree>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type=""
          @click="permissionVisible=false"
        >取消</el-button>
        <el-button
          type="primary"
          @click="confirmPermission"
        >确认</el-button>
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
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getUsers, getOrgs, getRoles, confirmUser, deleteUser ,getPermissionTree ,getPermissionIds,confirmPermission} from '@/api/user'
const defaultUser = {
  id: null,
  userName: "",
  realName: "",
  telephone: "",
  orgId: null,
  roleId: null,
  idNo:"",
  comment: ""
}
export default {
  name: 'userManagement',
  data() {
    return {
      total: 0,
      listLoading: true,
      userList: [],
      orgList: [],
      roleList: [],
      user: {},
      dialogVisible: false,
      permissionVisible: false,
      dialogType: 'new',
      listQuery: {
        page: 1,
        size: 10
      },
      curUserId:null,
      permissionTree: [],
      permissionIds:[],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      searchForm: {
        userName: ""
      },
    }
  },
  created: function () {
    this.getUsers();
    this.getOrgs();
    this.getRoles();
    this.getPermissionTree();
  },
  methods: {
    async getUsers() {
      this.listLoading = true
      Object.assign(this.listQuery,this.searchForm)
      const res = await getUsers(this.listQuery)
      this.userList = res.data.list
      this.total = res.data.total
      this.listLoading = false
    },
    async getOrgs() {
      const res = await getOrgs()
      this.orgList = res.data.data
    },
    async getRoles() {
      const res = await getRoles();
      this.roleList = res.data.data;
    },
    async getPermissionTree() {
      const res = await getPermissionTree();
      this.permissionTree = res.data;
    },
    async handleDeleteUser(index, data) {
      await deleteUser(data.id);
      this.getUsers();
    },

    async confirmUser() {
      await confirmUser(this.user)
      this.dialogVisible = false
      this.getUsers()
    },
    // 每页加载几条数据
    handleSizeChange(val) {
      this.listQuery.size = val;
      this.getUsers();
    },
    // 分页-当前页
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getUsers();
    },
    handleAddUser() {
      this.user = Object.assign({}, defaultUser)
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    async editPermission(userId) {
      this.permissionVisible = true
      this.curUserId = userId
      const res = await getPermissionIds(userId)
      this.permissionIds = res.data
    },
    async confirmPermission() {
      this.permissionVisible = false
      console.log(JSON.stringify(this.curUserId+this.permissionIds))
      this.permissionIds = this.$refs.tree.getCheckedKeys()
      confirmPermission(this.curUserId,this.permissionIds)
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
