<template>
  <div class="monitoring-family-doctors-index">
    <div class="monitoring-family-doctors-index-piece ">
      <div class="monitoring-family-doctors-index-form">
        <el-form :model="searchForm" ref="searchForm" label-width="80px" size="mini">
          <el-form-item label="任务ID" prop="id">
            <el-input v-model="searchForm.id"></el-input>
          </el-form-item>
          <el-form-item label="指标" prop="region">
            <el-select v-model="searchForm.region" placeholder="请选择指标" style="width: 100%;">
              <el-option label="指标一" value="shanghai"></el-option>
              <el-option label="指标二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间" required>
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="选择日期" v-model="searchForm.date1" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2" style="text-align: center;">——</el-col>
            <el-col :span="11">
              <el-form-item prop="date2">
                <el-time-picker placeholder="选择时间" v-model="searchForm.date2" style="width: 100%;"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item style="text-align: center;">
            <el-button type="primary" @click="submitForm('searchForm')">查询</el-button>
            <el-button @click="resetForm('searchForm')">重置</el-button>
            <el-button @click="resetForm('searchForm')">导出</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="monitoring-family-doctors-index-piece">
        <div id="pie"></div>
      </div>
    </div>
    <div class="monitoring-family-doctors-index-piece">
      <div class="monitoring-family-doctors-index-list">
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
          <el-table-column type="selection" width="55" v-if="userInfo.userRole.indexOf('项目管理员') != -1"></el-table-column>
          <el-table-column label="任务ID"></el-table-column>
          <el-table-column prop="literatureName" label="高危人群" width="auto"></el-table-column>
          <el-table-column prop="literatureName" label="随访人群" width="auto"></el-table-column>
          <el-table-column prop="literatureName" label="失访人群" width="auto"></el-table-column>
          <el-table-column prop="literatureName" label="脱访人群" width="auto"></el-table-column>
          <el-table-column label="内容" width="160">
            <template slot-scope="scope">
              <div style="text-align: center;display: inline-block;" v-for=" (item,index) in scope.row.literaturePersons"
                :key="`literaturePersons${index}`">
                <p> {{ item.srAuthorPersonName }} </p>
                <span style="font-size: 12px; color: #1890FF;">
                  {{ item.srAuthorDeptName }}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-link type="primary" :underline="false" @click="handleToDetailsPage(scope.row.literatureInfoId)">详情</el-link>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="pagination">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[5, 10]"
            :current-page.sync="pageNum" :page-size="5" layout="sizes, prev, pager, next" :total="total">
          </el-pagination>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import ListStatus from '@/components/ListStatus/listStatus.vue' // list 状态

  import {} from "@/api/dict.js" // 字典表接口文档

  import {} from "@/assets/js/dict.js" // 字典表接口文档


  import {
    handleDownloadFileList, // post 文件下载
  } from "@/assets/js/publicFunctions.js"

  export default {
    name: 'resultsManagementWritingsIndex',
    components: {
      ListStatus, // 列表状态
    },
    data() {
      return {
        searchForm: {
          publicationDate: [],
        },
        total: 0, // 查询总数
        pageNum: 1, // 查询分页
        pageSize: 5, // 查询分页


        departmentList: [], // 科室列表
        tableData: [],

        multipleSelection: [], // 选中的数据
      }
    },
    watch: {
      // 监听表格外全选的操作
      multipleSelection(newData, oldData) {

      }
    },
    created: function() {
      this.handleSearch(); // 初始化查询列表

    },
    mounted: function() {
      this.handleEchartsPie(); // 饼状统计图
    },
    methods: {
      // 饼状统计图
      handleEchartsPie() {;
        let pieCart = this.$echarts.init(document.getElementById('pie'))
        console.log('pie ----->', pieCart)
        let option = {
          color: ['#ffc770', '#47d6ff', '#479eff', '#25ffbc', 'rgba(255,255,255,.5)'],
          tooltip: {
            trigger: 'item',
            padding: [10, 10, 10, 10],
            formatter: "{b} :<br/> {d}%"
          },
          series: [{
            name: '',
            type: 'pie',
            radius: ['36%', '66%'],
            center: ['50%', '50%'],
            label: {
              fontSize: 13,
              color: '#333',
              formatter: function(param) {
                return param.name + '{per' + param.dataIndex + '|' + param.percent.toFixed(0) + '%}';
              },
              rich: {
                per0: {
                  padding: [0, 0, 0, 5],
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: '#ffc770'
                },
                per1: {
                  padding: [0, 0, 0, 5],
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: '#47d6ff'
                },
                per2: {
                  padding: [0, 0, 0, 5],
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: '#479eff'
                }
              }
            },
            labelLine: {
              show: true,
              // length: 6,
              // length2: 15
            },
            data: [{
              name: "高危人群",
              value: "100"
            }, {
              name: "随访人群",
              value: "120"
            }, {
              name: "失访人群",
              value: "132"
            }, {
              name: "脱访人群",
              value: "130"
            } ]
          }, {
            type: 'pie',
            radius: ['36%', '43%'],
            center: ['50%', '50%'],
            silent: true,
            data: [{
              name: '',
              value: 1,
            }]
          }]
        };


        pieCart.setOption(option);
      },

      // 表单重置
      handleResetSearch() {
        this.searchForm = {
          publicationDate: [],
        };
        this.handleSearch(); // 初始化查询列表
      },


      // 著作详情
      handleToDetailsPage(writingsId) {

      },

      // 表单查询
      handleSearch() {
        console.log('submit!');
        let {
          searchForm,
          pageNum,
          pageSize
        } = this, postData = {};

        if (!Array.isArray(searchForm.publicationDate)) {
          searchForm.publicationDate = []
        }

        postData = searchForm;

        console.log('postData ---->>>', postData)

      },

      // 分页
      handleSizeChange(val) {
        this.pageSize = val;
        this.handleSearch()
      },

      // 分页
      handleCurrentChange(val) {
        this.handleSearch(val);
      },
    }
  }
</script>


<style lang="scss" scoped>
  .monitoring-family-doctors-index {
    padding: 20px;
    background-color: #fff;

    .monitoring-family-doctors-index-piece {
      overflow: hidden;

      .monitoring-family-doctors-index-form {
        width: 50%;
        height: auto;
        float: left;
        padding: 80px 10px;

        &+div.monitoring-family-doctors-index-piece {
          width: 50%;
          height: 350px;
          float: left;

          &>#pie{
            width: 100%;
            height: 350px;
          }
        }
      }

      .monitoring-family-doctors-index-list {
        position: relative;

        // 选择查询结果导出
        .selectTableData {
          width: 100%;
          height: 48px;
          line-height: 48px;
          background-color: #F1F1F1;

          ul {
            overflow: hidden;

            li {
              float: left;
              margin-right: 25px;

              .el-checkbox {
                padding-left: 14px;
              }
            }
          }
        }
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
</style>

<style>
  .monitoring-family-doctors-index-piece .input-with-select .el-select .el-input {
    width: 90px;
  }

  .monitoring-family-doctors-index-piece .input-with-select .el-select .el-input input {
    padding: 0px 10px;
  }

  .monitoring-family-doctors-index-piece .el-date-editor .el-range-separator {
    width: 10%;
  }

  .monitoring-family-doctors-index-piece .el-date-editor--daterange.el-input__inner {
    width: 240px;
  }
</style>
