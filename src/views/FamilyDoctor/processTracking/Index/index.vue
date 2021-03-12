<template>
  <div class="processTrackingIndex">
    <!-- 查询搜索项 -->
    <div class="processTrackingIndex_query">
      <el-form
        :inline="true"
        :model="searchForm"
        class="processTrackingIndex_query_from p-l"
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
          <!-- 提交 -->
          <el-button
            type="success"
            @click="submit"
          >提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- table 数据展示 -->
    <div class="processTrackingIndex_table">
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
    <div class="processTrackingIndex_footer">
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
  name: 'processTrackingIndex',//数据查询
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
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 提交
    submit() {
      alert('提交')
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
    // 删除
    handleDelete(index, record) {
      console.log('删除---->>>>>', record);
      alert('删除')
    },
    // 完成
    handleComplete(index, record) {
      console.log('完成---->>>>>', record);
      alert('完成')
    },
    // 失访
    handleLoss(index, record) {
      console.log('失访---->>>>>', record);
      alert('失访')
    },
    // 脱访
    handleTackOff(index, record) {
      console.log('脱访---->>>>>', record);
      alert('脱访')
    },
    // 发放问卷
    handleIssue(index, record) {
      console.log('发放问卷---->>>>>', record);
      alert('发放问卷')
    },
    // 问卷回收
    handleRecycling(index, record) {
      console.log('问卷回收---->>>>>', record);
      alert('问卷回收')
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
.processTrackingIndex {
  .processTrackingIndex_query {
    .processTrackingIndex_query_from {
      background: #fff;
      padding: 12px 16px;
    }
  }
  .processTrackingIndex_table {
    background: #fff;
  }
  .processTrackingIndex_footer {
    margin-top: 10px;
  }
}
.line {
  text-align: center;
}
</style>


