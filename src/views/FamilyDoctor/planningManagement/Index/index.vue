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
        <!-- 患者姓名 -->
        <el-form-item
          label="患者姓名"
          prop="subjectName"
        >
          <el-input
            prefix-icon="el-icon-search"
            placeholder="患者姓名"
            v-model="searchForm.subjectName"
          />
        </el-form-item>
        <!-- 医生姓名 -->
        <el-form-item
          label="医生姓名"
          prop="doctor"
        >
          <el-input
            prefix-icon="el-icon-search"
            placeholder="医生姓名"
            v-model="searchForm.doctor"
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
          prop="case"
        >
          <el-select
            v-model="searchForm.case"
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
          label="患者姓名"
          width="200"
        />
        <el-table-column
          prop="sex"
          label="性别"
          width="100"
        />
        <el-table-column
          prop="content"
          label="身份证"
          width="300"
        />
        <el-table-column
          prop="level"
          label="风险等级"
          width="150"
        />
        <el-table-column
          prop="doctor"
          label="医生姓名"
          width="200"
        />
        <el-table-column
          prop="case"
          label="治疗方案"
          width="200"
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
      title="制定计划"
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
            <div>
              <span style="margin: 0 20px 20px 0;">姓名：</span><span>{{detailsForm.subjectName}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <!-- 治疗方案 -->
          <el-form-item
            label="治疗方案"
            prop="case"
          >
            <el-select
              v-model="detailsForm.case"
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
  name: 'planningManagementIndex',//制定随访计划
  data() {
    return {
      total: 0, // 查询总数
      pageNum: 1, // 查询分页
      pageSize: 5, // 查询分页
      searchForm: {
        subjectName: '',//姓名
        level: '',//分险等级
        case: '',//治疗方案
        doctor: '',//医生姓名
      },//查询条件
      tableData: [{
        key: '1',
        sex: '男',
        subjectName: '课题1',
        content: '231098199501261615',
        level: '中风险',
        case: '观察治疗',
        doctor: '李四'
      }, {
        key: '2',
        sex: '男',
        subjectName: '课题2',
        phone: '18845147789',
        content: '231098199501261615',
        level: '中风险',
        case: '观察治疗',
        doctor: '李四'
      }, {
        key: '3',
        sex: '男',
        subjectName: '课题3',
        phone: '18845147789',
        content: '231098199501261615',
        level: '中风险',
        case: '观察治疗',
        doctor: '李四'
      }, {
        key: '4',
        sex: '男',
        subjectName: '课题4',
        phone: '18845147789',
        content: '231098199501261615',
        level: '中风险',
        case: '观察治疗',
        doctor: '李四'
      }, {
        key: '5',
        sex: '男',
        subjectName: '课题5',
        phone: '18845147789',
        content: '231098199501261615',
        level: '中风险',
        case: '观察治疗',
        doctor: '李四'
      }, {
        key: '6',
        sex: '男',
        subjectName: '课题6',
        phone: '18845147789',
        content: '231098199501261615',
        level: '中风险',
        case: '观察治疗',
        doctor: '李四'
      }],//table模拟数据
      currentPage: 1,
      total: 100,
      developVisible: false,//制定Modal显示隐藏
      detailsForm: {
        subjectName: '',//随访名称
        case: '',//治疗方案
      },//详情form表单数据
      ruleForm: {
        case: [
          { required: true, message: '请选择治疗方案', trigger: 'blur' }
        ]
      },
    }
  },

  methods: {
    //   查询
    handleSearch() {
      console.log('查询--->>>>', this.searchForm);
      alert('查询')
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
      let data = record[index]
      this.detailsForm = data
      this.developVisible = true
      console.log('制定随访计划---->>>>>', record[index]);
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


