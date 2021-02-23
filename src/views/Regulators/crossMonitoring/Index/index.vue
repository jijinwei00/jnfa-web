<template>
  <div class="cross-monitoring-index">
    <div class="cross-monitoring-index-piece ">
      <div class="cross-monitoring-index-form">
        <el-form :model="searchForm" ref="searchForm" size="mini" inline>
          <el-form-item label="任务ID" prop="id">
            <el-input v-model="searchForm.id"></el-input>
          </el-form-item>
          <el-form-item label="指标" prop="region">
            <el-select v-model="searchForm.region" placeholder="请选择指标" style="width: 100%;">
              <el-option label="指标一" value="shanghai"></el-option>
              <el-option label="指标二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间">
            <el-date-picker
                  v-model="searchForm.publicationDate"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions">
                </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('searchForm')">查询</el-button>
            <el-button @click="resetForm('searchForm')">重置</el-button>
            <el-button @click="resetForm('searchForm')">导出</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="cross-monitoring-index-piece">
      <div id="line"></div>
    </div>
    <div class="cross-monitoring-index-piece">
      <div class="cross-monitoring-index-list">
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
          <el-table-column type="selection" width="55" v-if="userInfo.userRole.indexOf('项目管理员') != -1"></el-table-column>
          <el-table-column label="任务ID" width="100"></el-table-column>
          <el-table-column prop="literatureName" label="肺癌结果复审人数" width="auto"></el-table-column>
          <el-table-column prop="literatureName" label="家庭医生查询人数" width="auto"></el-table-column>
          <el-table-column prop="literatureName" label="家庭医生随访答应做CT人数" width="auto"></el-table-column>
          <el-table-column prop="literatureName" label="肺癌中心已做CT人数" width="auto"></el-table-column>
          <el-table-column label="内容">
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
      this.handleEchartsLine(); // 饼状统计图
    },
    methods: {
      // 折线状统计图
      handleEchartsLine() {
        let lineCart = this.$echarts.init(document.getElementById('line'))
        let option = {
          title: {

          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['肺癌结果复审人数', '家庭医生查询人数', '家庭医生随访答应做CT人数', '肺癌中心已做CT人数', ],
          },
          toolbox: {
            show: true,
            feature: {
              mark: {
                show: true
              },
              dataView: {
                show: false,
                readOnly: true
              },
              magicType: {
                show: true,
                type: ['line', 'bar']
              },
              restore: {
                show: true
              },
              saveAsImage: {
                show: true
              }
            }
          },
          calculable: true,
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: ['0:00', '4:00', '8:00', '12:00', '16:00', '20:00'],
            axisLabel: {
              show: true,
              textStyle: {
                // color: "#ebf8ac", //X轴文字颜色
                fontSize: 16
              }
            },

          }],
          yAxis: [{
            type: 'value',
            axisLabel: {
              formatter: '{value} ',
              // color: '#ccc',
              textStyle: {
                fontSize: 16
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                // color: "#ccc"
              },
            },


          }],
          series: [{
              name: '肺癌结果复审人数',
              type: 'line',
              smooth: true,
              data: [0.22, 0.23, 0.36, 0.30, 0.29, 0.35, 0.2],
              lineStyle: {
                normal: {
                  width: 4,
                  color: {
                    type: 'linear',

                    colorStops: [{
                      offset: 0,
                      color: '#62B7F7' // 0% 处的颜色
                    }, {
                      offset: 1,
                      color: '#0092f6' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                  },
                  shadowColor: 'rgba(72,216,191, 0.3)',
                  shadowBlur: 6,
                  shadowOffsetY: 10
                }
              },
              itemStyle: {
                normal: {
                  color: '#0092f6',
                  borderWidth: 10,
                  borderColor: "#0092f6"
                }
              },
              markPoint: {
                data: [{
                    type: 'max',
                    name: '最大值'
                  },
                  {
                    type: 'min',
                    name: '最小值'
                  }
                ]
              },
              markLine: {
                data: [{
                  type: 'average',
                  name: '平均值'
                }]
              }
            },
            {
              name: '家庭医生查询人数',
              smooth: true,
              type: 'line',
              data: [0, -0.1, 0.08, 0.06, 0.11, 0.07, 0],
              lineStyle: {
                normal: {
                  width: 4,
                  color: {
                    type: 'linear',

                    colorStops: [{
                      offset: 0,
                      color: '#F7715D' // 0% 处的颜色
                    }, {
                      offset: 1,
                      color: '#E3463B' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                  },
                  shadowColor: 'rgba(72,216,191, 0.3)',
                  shadowBlur: 6,
                  shadowOffsetY: 10
                }
              },
              itemStyle: {
                normal: {
                  color: '#E3463B',
                  borderWidth: 10,
                  borderColor: "#ED8371"
                }
              },
              markPoint: {
                data: [{
                  name: '周最低',
                  value: -2,
                  xAxis: 1,
                  yAxis: -1.5
                }],
              },
              markLine: {
                data: [{
                  type: 'average',
                  name: '平均值'
                }]
              }
            },
            {
              name: '家庭医生随访答应做CT人数',
              type: 'line',
              smooth: true,
              data: [0.08, 0, 0.15, 0.14, 0.16, 0.13, 0],
              lineStyle: {
                normal: {
                  width: 4,
                  color: {
                    type: 'linear',

                    colorStops: [{
                      offset: 0,
                      color: '#D1DB40' // 0% 处的颜色
                    }, {
                      offset: 1,
                      color: '#CED627' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                  },
                  shadowColor: 'rgba(72,216,191, 0.3)',
                  shadowBlur: 6,
                  shadowOffsetY: 10
                }
              },
              itemStyle: {
                normal: {
                  color: '#CED627',
                  borderWidth: 10,
                  borderColor: "#EDFA67"
                }
              },
              markPoint: {
                data: [{
                  name: '周最低',
                  value: -2,
                  xAxis: 1,
                  yAxis: -1.5
                }]
              },
              markLine: {
                data: [{
                  type: 'average',
                  name: '平均值'
                }]
              }
            },
            {
              name: '肺癌中心已做CT人数',
              type: 'line',
              smooth: true,
              lineStyle: {
                normal: {
                  width: 4,
                  color: {
                    type: 'linear',

                    colorStops: [{
                      offset: 0,
                      color: '#A9F387' // 0% 处的颜色
                    }, {
                      offset: 1,
                      color: '#48D8BF' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                  },
                  shadowColor: 'rgba(72,216,191, 0.3)',
                  shadowBlur: 6,
                  shadowOffsetY: 10
                }
              },
              data: [0.12, 0.13, 0.22, 0.17, 0.2, 0.23, 0],
              itemStyle: {
                normal: {
                  color: '#48D8BF',
                  borderWidth: 10,
                  borderColor: "#A9F387"
                }
              },
              //smooth: true,
              markPoint: {
                data: [{
                  name: '周最低',
                  value: -2,
                  xAxis: 1,
                  yAxis: -1.5
                }]
              },
              markLine: {
                data: [{
                  type: 'average',
                  name: '平均值'
                }]
              }
            }
          ]

        };


        lineCart.setOption(option);
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
  .cross-monitoring-index {
    padding: 20px;
    background-color: #fff;

    .cross-monitoring-index-piece {
      overflow: hidden;

      .cross-monitoring-index-form {
        height: auto;
      }

      &>#line {
        width: 100%;
        height: 350px;
        margin: 20px 0px;
      }

      .cross-monitoring-index-list {
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
  .cross-monitoring-index-piece .input-with-select .el-select .el-input {
    width: 90px;
  }

  .cross-monitoring-index-piece .input-with-select .el-select .el-input input {
    padding: 0px 10px;
  }

  .cross-monitoring-index-piece .el-date-editor .el-range-separator {
    width: 10%;
  }

  .cross-monitoring-index-piece .el-date-editor--daterange.el-input__inner {
    width: 240px;
  }
</style>
