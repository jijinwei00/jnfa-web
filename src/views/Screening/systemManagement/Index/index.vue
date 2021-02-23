<template>
  <div class="systemManagementIndex">
    <!-- 查询搜索项 -->
    <div class="systemManagement_query">
      <el-form
        :inline="true"
        :model="searchForm"
        class="systemManagement_query_from p-l"
        size="mini"
        ref="searchForm"
      >
        <!-- id -->
        <el-form-item label="ID">
          <el-input
            prefix-icon="el-icon-search"
            placeholder="ID"
            v-model="searchForm.id"
          />
        </el-form-item>
        <!-- date时间-->
        <el-form-item label="时间">
          <el-date-picker
            v-model="searchForm.date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <!-- button -->
        <el-form-item>
          <el-button
            type="primary"
            @click="handleSearch"
          >查询</el-button>
          <el-button
            :type="pushBtnStatus ? 'success' : ''"
            @click="handlePush('pushForm')"
          >推送</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- table 数据展示 -->
    <div class="systemManagement_table">
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
          prop="id"
          label="id"
          width="150"
        />
        <el-table-column
          prop="content"
          label="内容"
          show-overflow-tooltip
          width="450"
        />
        <el-table-column
          fixed="right"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="handleEdit(scope.$index, tableData)"
              type="text"
              size="small"
            >
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页底部展示 -->
    <div class="systemManagement_footer">
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

    <!-- 推送Modal -->
    <el-dialog
      title="推送"
      :visible.sync="pushVisible"
    >
      <el-form
        :model="pushForm"
        :rules="pushRuleForm"
        label-position="left"
        ref="pushForm"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="推送提醒内容："
              prop="content"
            >
              <el-input
                placeholder="推送提醒内容"
                style="width:572px"
                type="textarea"
                v-model="pushForm.content"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="操作："
              prop="operation"
            >
              <el-radio-group v-model="pushForm.operation">
                <el-radio label="1">启动</el-radio>
                <el-radio label="2">停止</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="pushVisible=false">取 消</el-button>
        <el-button
          type="primary"
          @click="pushOk('pushForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "systemManagementIndex", //筛选结果复审
  data() {
    return {
      total: 0, // 查询总数
      pageNum: 1, // 查询分页
      pageSize: 5, // 查询分页
      searchForm: {
        id: '', //id
        date: '',//时间
      }, //查询条件
      tableData: [
        {
          key: "1",
          id: "1000",
          content: "天津津南项目人群关注....",
        },
        {
          key: "2",
          id: "1000",
          content: "天津津南项目人群关注....",
        },
        {
          key: "3",
          id: "1000",
          content: "天津津南项目人群关注....",
        },
        {
          key: "4",
          id: "1000",
          content: "天津津南项目人群关注....",
        },
        {
          key: "5",
          id: "1000",
          content: "天津津南项目人群关注....",
        },
        {
          key: "6",
          id: "1000",
          content: "天津津南项目人群关注....",
        },
      ], //table模拟数据
      currentPage: 1,
      total: 100,
      pushBtnStatus: false,//推送按钮状态
      pushList: [],//推送复选信息
      pushVisible: false,//推送Modal框显示隐藏
      pushForm: {
        content: '',
        operation: '1'
      },//推送Modal form
      pushRuleForm: {
        content: [
          { required: true, message: "请填写推送提醒内容", trigger: "blur" },
        ],
        operation: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
      },//推送Modal 验证
    };
  },

  methods: {
    //   编辑
    handleEdit() {
      alert("编辑");
    },
    //   查询
    handleSearch() {
      console.log("查询--->>>>", this.searchForm);
      alert("查询");
    },
    // 推送
    handlePush(formName) {
      if (this.pushBtnStatus) {
        this.pushVisible = true
        this.$refs[formName].resetFields();
      }
    },
    //Table复选框选择
    handleSelectionChange(val) {
      console.log("table复选框选择----->>>>", val);
      this.pushList = val;
      if (val.length) {
        this.pushBtnStatus = true;
        return;
      }
      this.pushBtnStatus = false;
    },
    // 导出
    handleExport() {
      alert("导出");
    },

    // 每页加载几条数据
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 分页-当前页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 推送确定
    pushOk(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            message: '推送完成!',
            type: 'success'
          })
          this.pushVisible = false
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
};
</script>


<style lang="scss" scoped>
.systemManagementIndex {
  .systemManagement_query {
    .systemManagement_query_from {
      background: #fff;
      padding: 12px 16px;
    }
  }
  .systemManagement_table {
    background: #fff;
  }
  .systemManagement_footer {
    margin-top: 10px;
  }
}
</style>


