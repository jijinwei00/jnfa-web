<template>
  <div class="dataModelIndex">
    <!-- 查询搜索项 -->
    <div class="dataModelIndex_query">
      <el-form
        :inline="true"
        :model="searchForm"
        class="dataModelIndex_query_from p-l"
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
        <!-- 身份证 -->
        <el-form-item label="身份证">
          <el-input
            prefix-icon="el-icon-search"
            placeholder="身份证"
            v-model="searchForm.IDcard"
          />
        </el-form-item>
        <!-- CT -->
        <el-form-item label="CT结果">
          <el-input
            prefix-icon="el-icon-search"
            placeholder="CT结果"
            v-model="searchForm.CTresult"
          />
        </el-form-item>
        <!-- button -->
        <el-form-item>
          <el-button
            type="primary"
            @click="handleSearch"
          >查询</el-button>
          <el-button @click="handleExport">导出</el-button>
          <el-button
            :type="examineBtnStatus ? 'primary' : ''"
            @click="handleExamine"
          >审批</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- table 数据展示 -->
    <div class="dataModelIndex_table">
      <el-table
        :data="tableData"
        style="width: 100%"
        max-height="400"
        ref="multipleTable"
        tooltip-effect="dark"
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
          width="150"
        />
        <el-table-column
          prop="name"
          label="姓名"
          width="120"
        />
        <el-table-column
          prop="IDcard"
          label="身份证"
          width="300"
        />
        <el-table-column
          prop="sex"
          label="性别"
          width="120"
        />
        <el-table-column
          prop="status"
          label="状态"
          width="120"
        />
        <el-table-column
          prop="CTresult"
          label="CT结果"
          width=""
        />
      </el-table>
    </div>
    <!-- 分页底部展示 -->
    <div class="dataModelIndex_footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 审批Modal -->
    <el-dialog
      title="审批"
      :visible.sync="examineVisible"
    >
      <el-form
        :model="examineForm"
        :rules="examineRuleForm"
        label-position="left"
        ref="examineForm"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="审核："
              prop="examineRusult"
            >
              <el-select
                v-model="examineForm.examineRusult"
                placeholder="请选择审核选项"
                style="width:572px"
              >
                <el-option
                  v-for="item in examineOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="建议："
              prop="desc"
            >
              <el-input
                placeholder="请给出合理化建议"
                style="width:572px"
                type="textarea"
                v-model="examineForm.desc"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="examineVisible=false">取 消</el-button>
        <el-button
          type="primary"
          @click="examineOk('examineForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "screeningReviewIndex", //筛选结果复审
  data() {
    return {
      total: 0, // 查询总数
      pageNum: 1, // 查询分页
      pageSize: 5, // 查询分页
      searchForm: {
        name: "", //姓名
        IDcard: "", //身份证号
        CTresult: "", //CT结果
      }, //查询条件
      tableData: [
        {
          key: "1",
          name: "测试",
          IDcard: "231084199601261515",
          sex: "男",
          CTresult: "有结果：4-6cm",
          status: "待审批",
        },
        {
          key: "2",
          name: "测试",
          IDcard: "231084199601261515",
          sex: "男",
          CTresult: "有结果：4-6cm",
          status: "待审批",
        },
        {
          key: "3",
          name: "测试",
          IDcard: "231084199601261515",
          sex: "男",
          CTresult: "有结果：4-6cm",
          status: "待审批",
        },
        {
          key: "4",
          name: "测试",
          IDcard: "231084199601261515",
          sex: "男",
          CTresult: "有结果：4-6cm",
          status: "待审批",
        },
        {
          key: "5",
          name: "测试",
          IDcard: "231084199601261515",
          sex: "男",
          CTresult: "有结果：4-6cm",
          status: "待审批",
        },
        {
          key: "6",
          name: "测试",
          IDcard: "231084199601261515",
          sex: "男",
          CTresult: "有结果：4-6cm",
          status: "待审批",
        },
      ], //table模拟数据
      currentPage: 1,
      total: 100,
      examineBtnStatus: false, //审批按钮显示状态
      examineList: [], //审批对象list
      examineVisible: false, //审批Modal显示隐藏
      examineForm: {
        examineRusult: "", //审核选项
        desc: "",//建议意见
      }, //审核表单
      examineRuleForm: {
        examineRusult: [
          { required: true, message: "请选择审核原因", trigger: "blur" },
        ],
        desc: [
          { required: true, message: "请给出合理化建议", trigger: "blur" },
        ],
      }, //审核表单验证规则
      examineOption: [
        {
          value: "1",
          label: "审核通过",
        },
        {
          value: "2",
          label: "审核不通过",
        },
        {
          value: "3",
          label: "待定",
        },
      ], //审核选项
    };
  },

  methods: {
    //   查询
    handleSearch() {
      console.log("查询--->>>>", this.searchForm);
      alert("查询");
    },
    // 导出
    handleExport() {
      alert("导出");
    },
    // 审批
    handleExamine() {
      if (this.examineBtnStatus) {
        this.examineVisible = true;
      }
    },
    //Table复选框选择
    handleSelectionChange(val) {
      console.log("table复选框选择----->>>>", val);
      this.examineList = val;
      if (val.length) {
        this.examineBtnStatus = true;
        return;
      }
      this.examineBtnStatus = false;
    },
    // 每页加载几条数据
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 分页-当前页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    examineOk(formName) {
      this.$refs[formName].validate((valid) => {
        this.$message({
          message: '审批完成!',
          type: 'success'
        })
        this.examineVisible = false
      });
    }
  },
};
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


