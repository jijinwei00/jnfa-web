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
        <!-- 癌筛查标准 -->
        <el-form-item
          label="癌筛查标准"
          prop="conditions"
        >
          <el-select
            v-model="searchForm.conditions"
            placeholder="请选择癌筛查标准"
          >
            <el-option
              label="吸烟包年数不少于10年（包年），包括曾经不少于10年（包年)，但戒烟不足1年"
              value="0"
            >吸烟包年数不少于10年（包年），包括曾经不少于10年（包年)，但戒烟不足1年</el-option>
            <el-option
              label="与公共生活或同事工作被动吸烟超过20年"
              value="1"
            >与公共生活或同事工作被动吸烟超过20年</el-option>
            <el-option
              label="患有慢性肺疾病"
              value="2"
            >患有慢性肺疾病</el-option>
            <el-option
              label="有职业暴露史不少于1年，包括暴露干石棉、氨铋銘硅和烟灰"
              value="3"
            >有职业暴露史不少于1年，包括暴露干石棉、氨铋銘硅和烟灰</el-option>
            <el-option
              label="有亲属确诊肺癌"
              value="4"
            >有亲属确诊肺癌</el-option>
            <el-option
              label="其他条件"
              value="5"
            >其他条件</el-option>
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
          prop="idcard"
          label="身份证"
          width="300"
        />
        <el-table-column
          prop="level"
          label="风险等级"
          width="150"
        />
        <el-table-column
          prop="content"
          label="内容"
        />
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
      title="详情"
      :visible.sync="detailsVisible"
    >
      <el-form
        :model="detailsForm"
        label-position="left"
        ref="detailsForm"
        :inline="true"
      >
        <!-- 姓名 性别-->
        <el-row>
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="姓名：">
                <el-input
                  v-model="detailsForm.name"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="性别：">
                <el-input
                  v-model="detailsForm.sex"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
          </el-col>
        </el-row>
        <!-- 执行时间 联系方式-->
        <el-row>
          <el-col :span="11">
            <el-form-item label="执行时间：">
              <el-input
                v-model="detailsForm.date"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="联系方式：">
              <el-input
                v-model="detailsForm.phone"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 身份证号 职业 -->
        <el-row>
          <el-col :span="11">
            <el-form-item label="身份证号：">
              <el-input
                v-model="detailsForm.idCard"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="职业：">
              <el-input
                v-model="detailsForm.work"
                disabled
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
  name: 'highDataQueryIndex',//高风险底册级别设置
  data() {
    return {
      total: 0, // 查询总数
      pageNum: 1, // 查询分页
      pageSize: 5, // 查询分页
      searchForm: {
        level: '',//等级
        conditions: '',//筛选条件
      },//查询条件
      tableData: [{
        key: '1',
        sex: '男',
        subjectName: '课题1',
        phone: '18845147789',
        professional: '个人',
        content: '全球宇宙无敌卫健委中心',
        idcard: '231098199501261615',
        level: '高风险'
      }, {
        key: '2',
        sex: '男',
        subjectName: '课题2',
        phone: '18845147789',
        content: '全球宇宙无敌卫健委中心',
        idcard: '231098199501261615',
        professional: '个人',
        gljg: '全球宇宙无敌卫健委中心',
        level: '高风险'
      }, {
        key: '3',
        sex: '男',
        subjectName: '课题3',
        phone: '18845147789',
        content: '全球宇宙无敌卫健委中心',
        idcard: '231098199501261615',
        professional: '个人',
        gljg: '全球宇宙无敌卫健委中心',
        level: '高风险'
      }, {
        key: '4',
        sex: '男',
        subjectName: '课题4',
        phone: '18845147789',
        content: '全球宇宙无敌卫健委中心',
        idcard: '231098199501261615',
        professional: '个人',
        gljg: '全球宇宙无敌卫健委中心',
        level: '高风险'
      }, {
        key: '5',
        sex: '男',
        subjectName: '课题5',
        phone: '18845147789',
        content: '全球宇宙无敌卫健委中心',
        idcard: '231098199501261615',
        professional: '个人',
        gljg: '全球宇宙无敌卫健委中心',
        level: '高风险'
      }, {
        key: '6',
        sex: '男',
        subjectName: '课题6',
        phone: '18845147789',
        content: '全球宇宙无敌卫健委中心',
        idcard: '231098199501261615',
        professional: '个人',
        gljg: '全球宇宙无敌卫健委中心',
        level: '高风险'
      }],//table模拟数据
      currentPage: 1,
      total: 100,
      detailsVisible: false,//详情Modal显示隐藏
      detailsForm: {
        name: '课题1',//姓名
        date: '2020-1-29 10:00',//执行时间
        phone: '13674611289',//联系方式
        sex: '男',//性别
        idCard: '231095199601231515',//身份证号
        work: '个人',//职业
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
    // 详情
    handleDetails(index, record) {
      this.detailsVisible = true
      console.log('详情---->>>>>', record);
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
.line {
  text-align: center;
}
</style>


