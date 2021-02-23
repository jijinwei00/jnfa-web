<template>
  <div class="planningManagementIndex">
    <!-- 查询搜索项 -->
    <div class="planningManagementIndex_query">
      <el-form
        :inline="true"
        :model="searchForm"
        class="planningManagementIndex_query_from p-l"
        size="mini"
        ref="searchForm"
      >
        <!-- 姓名 -->
        <el-form-item label="姓名">
          <el-input
            prefix-icon="el-icon-search"
            placeholder="姓名"
            v-model="searchForm.subjectName"
          />
        </el-form-item>
        <!-- 年龄 -->
        <el-form-item label="年龄">
          <el-input
            prefix-icon="el-icon-search"
            placeholder="年龄min"
            v-model="searchForm.minAge"
          />
        </el-form-item>
        <el-form-item>
          -
        </el-form-item>
        <el-form-item>
          <el-input
            prefix-icon="el-icon-search"
            placeholder="年龄max"
            v-model="searchForm.maxAge"
          />
        </el-form-item>
        <!-- 吸烟 -->
        <el-form-item label="吸烟">
          <el-select
            v-model="searchForm.smoke"
            placeholder="是否吸烟"
          >
            <el-option
              label="是"
              value="1"
            ></el-option>
            <el-option
              label="否"
              value="2"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 被动吸烟 -->
        <el-form-item label="被动吸烟">
          <el-select
            v-model="searchForm.smoke1"
            placeholder="被动吸烟"
          >
            <el-option
              label="是"
              value="1"
            ></el-option>
            <el-option
              label="否"
              value="2"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 职业暴露史 -->
        <el-form-item label="职业暴露史">
          <el-select
            v-model="searchForm.smoke2"
            placeholder="是否有职业暴露史"
          >
            <el-option
              label="是"
              value="1"
            ></el-option>
            <el-option
              label="否"
              value="2"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 恶性肿瘤病史 -->
        <el-form-item label="恶性肿瘤病史">
          <el-select
            v-model="searchForm.smoke3"
            placeholder="是否有恶性肿瘤病史"
          >
            <el-option
              label="是"
              value="1"
            ></el-option>
            <el-option
              label="否"
              value="2"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 管理机构 -->
        <el-form-item label="管理机构">
          <el-select
            v-model="searchForm.sex"
            placeholder="请选择管理机构"
          >
            <el-option
              label="管理机构A"
              value="1"
            ></el-option>
            <el-option
              label="管理机构B"
              value="2"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- button -->
        <el-form-item>
          <el-button
            type="primary"
            @click="handleSearch"
          >查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- table 数据展示 -->
    <div class="planningManagementIndex_table">
      <el-table
        :data="tableData"
        style="width: 100%"
        max-height="400"
      >
        <el-table-column
          fixed
          prop="key"
          label="序号"
          width="100"
        />

        <el-table-column
          prop="subjectName"
          label="姓名"
          width="200"
        />
        <el-table-column
          prop="sex"
          label="性别"
          width="100"
        />
        <el-table-column
          prop="phone"
          label="联系方式"
          width="150"
        />
        <el-table-column
          prop="content"
          label="身份证"
          width="300"
        />
        <el-table-column
          prop="professional"
          label="职业"
          width="150"
        />
        <el-table-column
          prop="gljg"
          label="管理机构"
          width="300"
        />
        <el-table-column
          fixed="right"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="handleDevelop(scope.$index, tableData)"
              type="text"
              size="small"
            >
              制定计划
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页底部展示 -->
    <div class="planningManagementIndex_footer">
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
      title="制定随访计划"
      :visible.sync="developVisible"
    >
      <el-form
        :model="detailsForm"
        :rules="ruleForm"
        label-position="left"
        ref="detailsForm"
        label-width="100px"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="名称："
              prop="name"
            >
              <el-input v-model="detailsForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item
            label="执行时间："
            required
          >
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="detailsForm.date1"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col
              class="line"
              :span="2"
            >-</el-col>
            <el-col :span="11">
              <el-form-item prop="date2">
                <el-time-picker
                  placeholder="选择时间"
                  v-model="detailsForm.date2"
                  style="width: 100%;"
                ></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-row>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="detailsOK('detailsForm')"
          type="primary"
        >确 定</el-button>
        <el-button
          @click="developVisible=false"
          type="primary"
        >取 消</el-button>

      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'planningManagementIndex',//任务管理
  data() {
    return {
      total: 0, // 查询总数
      pageNum: 1, // 查询分页
      pageSize: 5, // 查询分页
      searchForm: {
        subjectName: '',//姓名
        smoke: '',//是否吸烟
        sex: '',//管理机构
        minAge: '',//最小年龄年龄
        maxAge: '',//最大年龄
        smoke1: '',//被动吸烟
        smoke2: '',//职业暴露史
        smoke3: '',//恶性肿瘤病史
      },//查询条件
      tableData: [{
        key: '1',
        sex: '男',
        subjectName: '课题1',
        phone: '18845147789',
        content: '231098199501261615',
        professional: '个人',
        gljg: '全球宇宙无敌卫健委中心',
      }, {
        key: '2',
        sex: '男',
        subjectName: '课题2',
        phone: '18845147789',
        content: '231098199501261615',
        professional: '个人',
        gljg: '全球宇宙无敌卫健委中心',
      }, {
        key: '3',
        sex: '男',
        subjectName: '课题3',
        phone: '18845147789',
        content: '231098199501261615',
        professional: '个人',
        gljg: '全球宇宙无敌卫健委中心',
      }, {
        key: '4',
        sex: '男',
        subjectName: '课题4',
        phone: '18845147789',
        content: '231098199501261615',
        professional: '个人',
        gljg: '全球宇宙无敌卫健委中心',
      }, {
        key: '5',
        sex: '男',
        subjectName: '课题5',
        phone: '18845147789',
        content: '231098199501261615',
        professional: '个人',
        gljg: '全球宇宙无敌卫健委中心',
      }, {
        key: '6',
        sex: '男',
        subjectName: '课题6',
        phone: '18845147789',
        content: '231098199501261615',
        professional: '个人',
        gljg: '全球宇宙无敌卫健委中心',
      }],//table模拟数据
      currentPage: 1,
      total: 100,
      developVisible: false,//制定Modal显示隐藏
      detailsForm: {
        name: '',//随访名称
        date1: '',//随访日期
        date2: '',//随访时间
      },//详情form表单数据
      ruleForm: {
        name: [
          { required: true, message: '请输入随访名称', trigger: 'blur' },
        ],
        date1: [
          { type: 'date', required: true, message: '请输入随访执行日期', trigger: 'blur' }
        ],
        date2: [
          { type: 'date', required: true, message: '请输入随访执行时间', trigger: 'blur' }
        ],
      },
    }
  },

  methods: {
    //   查询
    handleSearch() {
      console.log('查询--->>>>', this.searchForm);
      alert('查询')
    },

    // 每页加载几条数据
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 分页-当前页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 制定随访计划
    handleDevelop(index, record) {
      this.developVisible = true
      console.log('制定随访计划---->>>>>', record);
    },
    //制定随访计划 确定
    detailsOK(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            message: '制定成功!',
            type: 'success'
          })
          this.addVisible = false
        } else {
          this.$message({
            message: '制定失败!',
            type: 'error'
          });
          return false;
        }
      });
    }
  }
}
</script>


<style lang="scss" scoped>
.planningManagementIndex {
  .planningManagementIndex_query {
    .planningManagementIndex_query_from {
      background: #fff;
      padding: 12px 16px;
    }
  }
  .planningManagementIndex_table {
    background: #fff;
  }
  .planningManagementIndex_footer {
    margin-top: 10px;
  }
}
.line {
  text-align: center;
}
</style>


