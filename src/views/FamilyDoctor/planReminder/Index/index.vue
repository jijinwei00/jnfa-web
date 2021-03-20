<template>
  <div class="planReminderIndex">
    <!-- 查询搜索项 -->
    <div class="planReminderIndex_query">
      <el-form
        :inline="true"
        :model="searchForm"
        class="planReminderIndex_query_from p-l"
        size="mini"
        ref="searchForm"
      >
        <!-- 姓名 -->
        <el-form-item label="姓名">
          <el-input
            prefix-icon="el-icon-search"
            placeholder="姓名"
            v-model="searchForm.name"
          />
        </el-form-item>
        <!-- 证件号码 -->
        <el-form-item
          label="证件号码"
          prop="idCard"
        >
          <el-input
            prefix-icon="el-icon-search"
            placeholder="证件号码"
            v-model="searchForm.idCard"
          />
        </el-form-item>
        <!-- 时间 -->
        <el-form-item
          label="时间"
          prop="date"
        >
          <el-date-picker
            v-model="searchForm.date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
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
          <!-- 打印 -->
          <el-button
            type="success"
            @click="submit"
          >打印</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- table 数据展示 -->
    <div class="planReminderIndex_table">
      <el-table
        :data="tableData"
        style="width: 100%"
        max-height="400"
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
          width="100"
        />
        <el-table-column
          prop="subjectName"
          label="姓名"
          width="100"
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
          prop="cardType"
          label="证件类型"
          width="150"
        />
        <el-table-column
          prop="content"
          label="证件号码"
          width="300"
        />
        <el-table-column
          prop="professional"
          label="治疗方案"
          width="150"
        />
        <el-table-column
          prop="gljg"
          label="CT结果"
          width="300"
        />
        <el-table-column
          prop="doctor"
          label="医生姓名"
          width="150"
        />
        <el-table-column
          prop="ysjy"
          label="医生建议"
          width="300"
        />
      </el-table>
    </div>
    <!-- 分页底部展示 -->
    <div class="planReminderIndex_footer">
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
    <!-- 知情同意书Modal -->
    <el-dialog
      title=""
      :visible.sync="developVisible"
       class="zqty_add"
    >
   
      <el-form
        :model="zqtyList"
        :rules="ruleForm"
        label-position="left"
        ref="zqtyList"
        label-width="100px"
      >
         <p style="marginBottom:20px;fontSize:18px;textAlign: center">知情同意书</p>
     <!-- 姓名 性别 出生日期-->
          <el-row>
            <el-form-item>
              <span>姓名：</span><span class="add_content">{{zqtyList.name}}</span>
              <span class="add_margin"></span>
              <span>性别：</span>
              <el-radio-group
                v-model="zqtyList.sex"
              >
                <el-radio label="1">男</el-radio>
                <el-radio label="2">女</el-radio>
              </el-radio-group>
              <span class="add_margin"></span>
              <span>出生日期：</span><span class="add_content">{{zqtyList.birthday}}</span>
            </el-form-item>
          </el-row>
          <!-- 民族  籍贯-->
          <el-row>
            <el-form-item>
              <span>民族：</span><span class="add_content">{{zqtyList.nation}}</span>
              <span class="add_margin"></span>
              <span>籍贯：</span>
              <span class="add_content">{{zqtyList.nativePlace}}</span>
            </el-form-item>
          </el-row>
          <!--   身份证号 本人联系电话 紧急联系电话-->
          <el-row>
            <el-form-item>
              <span>身份证号：</span>
              <span class="add_content">{{zqtyList.idNo}}</span>
              <span class="add_margin"></span>
              <span>本人联系电话：</span><span class="add_content">{{zqtyList.telephone}}</span>
              <span class="add_margin"></span>
              <span>紧急联系电话：</span>
              <span class="add_content">{{zqtyList.emergencyTel}}</span>
            </el-form-item>
          </el-row>
          <!-- 常住地址 工作单位-->
          <el-row>
            <el-form-item>
              <span>常住地址：</span><span class="add_content">{{zqtyList.address}}</span>
              <span class="add_margin"></span>
            </el-form-item>
          </el-row>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="detailsOK('zqtyList')"
          type="primary"
        >打 印</el-button>
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
  name: 'planReminderIndex',//知情同意书打印
  data() {
    return {
      total: 0, // 查询总数
      pageNum: 1, // 查询分页
      pageSize: 5, // 查询分页
      searchForm: {
        name: '',//姓名
        date: '',//时间
        level: '',//风险等级
        idCard: '',//证件号码
      },//查询条件
      tableData: [{
        key: '1',
        sex: '男',
        subjectName: '课题1',
        phone: '18845147789',
        content: '231098199501261615',
        professional: '手术治疗',
        gljg: '结节大于6mm小于15mm',
        cardType: '居民身份证',
        ysjy: '立即手术',
        doctor: '张医生'
      }, {
        key: '2',
        sex: '男',
        subjectName: '课题2',
        phone: '18845147789',
        content: '231098199501261615',
        professional: '手术治疗',
        gljg: '结节大于6mm小于15mm',
        cardType: '居民身份证',
        ysjy: '立即手术',
        doctor: '张医生'
      }, {
        key: '3',
        sex: '男',
        subjectName: '课题3',
        phone: '18845147789',
        content: '231098199501261615',
        professional: '手术治疗',
        gljg: '结节大于6mm小于15mm',
        cardType: '居民身份证',
        ysjy: '立即手术',
        doctor: '张医生'
      }, {
        key: '4',
        sex: '男',
        subjectName: '课题4',
        phone: '18845147789',
        content: '231098199501261615',
        professional: '手术治疗',
        gljg: '结节大于6mm小于15mm',
        cardType: '居民身份证',
        ysjy: '立即手术',
        doctor: '张医生'
      }, {
        key: '5',
        sex: '男',
        subjectName: '课题5',
        phone: '18845147789',
        content: '231098199501261615',
        professional: '手术治疗',
        gljg: '结节大于6mm小于15mm',
        cardType: '居民身份证',
        ysjy: '立即手术',
        doctor: '张医生'
      }, {
        key: '6',
        sex: '男',
        subjectName: '课题6',
        phone: '18845147789',
        content: '231098199501261615',
        professional: '手术治疗',
        gljg: '结节大于6mm小于15mm',
        cardType: '居民身份证',
        ysjy: '立即手术',
        doctor: '张医生'
      }, {
        key: '7',
        sex: '男',
        subjectName: '课题4',
        phone: '18845147789',
        content: '231098199501261615',
        professional: '手术治疗',
        gljg: '结节大于6mm小于15mm',
        cardType: '居民身份证',
        ysjy: '立即手术',
        doctor: '张医生'
      }, {
        key: '8',
        sex: '男',
        subjectName: '课题5',
        phone: '18845147789',
        content: '231098199501261615',
        professional: '手术治疗',
        gljg: '结节大于6mm小于15mm',
        cardType: '居民身份证',
        ysjy: '立即手术',
        doctor: '张医生'
      }, {
        key: '9',
        sex: '男',
        subjectName: '课题6',
        phone: '18845147789',
        content: '231098199501261615',
        professional: '手术治疗',
        gljg: '结节大于6mm小于15mm',
        cardType: '居民身份证',
        ysjy: '立即手术',
        doctor: '张医生'
      }],//table模拟数据
      currentPage: 1,
      total: 100,
      developVisible: false,//制定Modal显示隐藏
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
       zqtyList:{
          name:"",
          sex:0,
          birthday:null,
          nation:"",
          nativePlace:"",
          idNo:"",
          telephone:"",
          emergencyTel:"",
          address:"",
          archiveId:"",
          smookingStatus:0,
          copd:0,
          exposePoison:0,
          relationSuffer:0
        }
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
    // 打印
    submit() {
     this.developVisible=true
    },
    //Table复选框选择
    handleSelectionChange(val) {
      console.log("table复选框选择----->>>>", val);
    },
    // 每页加载几条数据
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 分页-当前页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //知情同意书 打印
    detailsOK(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            message: '打印成功!',
            type: 'success'
          })
          this.addVisible = false
        } else {
          this.$message({
            message: '打印失败!',
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
.planReminderIndex {
  .planReminderIndex_query {
    .planReminderIndex_query_from {
      background: #fff;
      padding: 12px 16px;
    }
  }
  .planReminderIndex_table {
    background: #fff;
  }
  .planReminderIndex_footer {
    margin-top: 10px;
  }
}
.line {
  text-align: center;
}
.zqty_add {
    .el-form-item {
      margin-bottom: 18px;
    }
    .add_margin {
      margin: 0 10px;
    }
    .add_content {
      text-decoration: underline;
    }
  }
</style>


