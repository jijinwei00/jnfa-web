<template>
  <div class="addClass">
    <el-dialog
      title="添加"
      :visible.sync="addVisible"
    >
      <el-form
        :model="addForm"
        :rules="ruleForm"
        label-position="left"
        ref="addForm"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="主题名称："
              prop="subject"
            >
              <el-input
                v-model="addForm.subject"
                placeholder="请输入主题名称"
                style="width:572px"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4">
          <el-col :span="12">
            <el-form-item
              label="最小年龄："
              prop="minAge"
            >
              <el-input
                placeholder="年龄min"
                v-model="addForm.minAge"
                style="width: 100%;"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              prop="maxAge"
              label="最大年龄："
            >
              <el-input
                placeholder="年龄max"
                v-model="addForm.maxAge"
                style="width: 100%;"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4">
          <el-col :span="12">
            <el-form-item label="管理机构：" prop="manageOrg">
              <el-select placeholder="请选择" v-model="addForm.manageOrg">
                <el-option
                  v-for="org in orgList"
                  :key="org.id"
                  :label="org.name"
                  :value="org.name"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="4">
          <el-col :span="12">
            <el-form-item
              label="吸烟>=20包年，其中包括戒烟时间不足15年者："
              prop="smoke"
            >
              <el-radio-group v-model="addForm.smoke">
                <el-radio
                  label="是"
                  value="1"
                ></el-radio>
                <el-radio
                  label="否"
                  value="0"
                ></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="被动吸烟者："
              prop="passiveSmoking"
            >
              <el-radio-group v-model="addForm.passiveSmoking">
                <el-radio
                  label="是"
                  value="1"
                ></el-radio>
                <el-radio
                  label="否"
                  value="0"
                ></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4">
          <el-col :span="12">
            <el-form-item
              label="有职业暴露史："
              prop="exposeHis"
            >
              <el-radio-group v-model="addForm.exposeHis">
                <el-radio
                  label="是"
                  value="1"
                ></el-radio>
                <el-radio
                  label="否"
                  value="0"
                ></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="是否有恶性肿瘤病史："
              prop="pastMaliGnant"
            >
              <el-radio-group v-model="addForm.pastMaliGnant">
                <el-radio
                  label="是"
                  value="1"
                ></el-radio>
                <el-radio
                  label="否"
                  value="0"
                ></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="addVisible=false">取 消</el-button>
        <el-button
          type="primary"
          @click="addOk('addForm')"
        >确 定
        </el-button>
      </div>
    </el-dialog>
    <el-button
      type="success"
      @click="handleToAddPage()"
    >添加
    </el-button>
  </div>
</template>

<script>
  import {postIndicatorAdd} from '@/api/screeningAPI'
  import {getOrgs} from '@/api/user'

export default {
  name: 'addModal',//数据模型指标设置-添加Modal弹出
  data() {
    return {
      addVisible: false,
      addForm: {
        subject: '',//课题
        minAge: '',//最小年龄
        maxAge: '',//最大年龄
        smoke: null,//是否吸烟
        exposeHis: null,//职业暴露史
        passiveSmoking: null,//被动吸烟
        pastMaliGnant: null,//是否有肿瘤病史
        manageOrg: '',//属于地区
      },
      ruleForm: {
        subject: [
          { required: true, message: '请输入课题名称', trigger: 'blur' },
        ],
        minAge: [
          { required: true, message: '请输入年龄', trigger: 'blur' }
        ],
        maxAge: [
          { required: true, message: '请输入年龄', trigger: 'blur' }
        ],
        exposeHis: [
          { required: true, message: '请选择危险因素', trigger: 'blur' }
        ],
        manageOrg: [
          { required: true, message: '请选择属于地区', trigger: 'blur' }
        ],
        pastMaliGnant: [
          { required: true, message: '请选择是否有肿瘤病史', trigger: 'blur' }
        ],
        smoke: [
          { required: true, message: '请选择是否有肿瘤病史', trigger: 'blur' }
        ],
        passiveSmoking: [
          { required: true, message: '请选择是否有肿瘤病史', trigger: 'blur' }
        ]
      },
      orgList: []
    }
  },
  created: function () {
    this.getOrgs();
  },
  methods: {
    //   添加
    handleToAddPage() {
      this.addVisible = true
      if(this.$refs.addForm!==undefined){
        this.$refs.addForm.resetFields()
      }
    },
    // 点击确定保存
    addOk(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(JSON.stringify(this.addForm))
          postIndicatorAdd(this.addForm)
          this.$message({
            message: '添加成功!',
            type: 'success'
          })
          this.addVisible = false
        } else {
          this.$message({
            message: '添加失败!',
            type: 'error'
          });
          return false;
        }
      });
    },
    async getOrgs() {
      const res = await getOrgs()
      this.orgList = res.data.data
    }
  }
}
</script>

<style lang="scss" scoped>
.addClass {
  display: inline-block;
}
.el-form-item {
  .el-form-item {
    margin-bottom: 14px;
  }
}
</style>
