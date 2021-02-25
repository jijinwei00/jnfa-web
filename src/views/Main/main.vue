<template>
  <div class="main-index">
    <div class="main-index-piece ">
      <div class="main-index-echarts-list">
        <div class="main-index-piece main-index-piece-item">
          <div id="pie"></div>
        </div>
        <div class="line-margin"></div>
        <div class="main-index-piece main-index-piece-item main-index-piece-item-right">
          <div class="case">
            <marquee
              direction="up"
              behavior="scroll"
              scrollamount="3"
            >
              <br>
              *关于津南区公立医院开展肿瘤筛查活动的通知。关于津南区公立医院开展肿瘤筛查活动的通知。关于津南区公立医院开展肿瘤筛查活动的通知。
              <br>
              <br>
              *关于津南区公立医院开展肿瘤筛查活动的通知。关于津南区公立医院开展肿瘤筛查活动的通知。关于津南区公立医院开展肿瘤筛查活动的通知。
              <br>
              <br>
              *关于津南区公立医院开展肿瘤筛查活动的通知。关于津南区公立医院开展肿瘤筛查活动的通知。关于津南区公立医院开展肿瘤筛查活动的通知。
              <br>
              <br>
              *关于津南区公立医院开展肿瘤筛查活动的通知。关于津南区公立医院开展肿瘤筛查活动的通知。关于津南区公立医院开展肿瘤筛查活动的通知。
              <br>
              <br>
              *关于津南区公立医院开展肿瘤筛查活动的通知。关于津南区公立医院开展肿瘤筛查活动的通知。关于津南区公立医院开展肿瘤筛查活动的通知。
              <br>
              <br>
              *关于津南区公立医院开展肿瘤筛查活动的通知。关于津南区公立医院开展肿瘤筛查活动的通知。关于津南区公立医院开展肿瘤筛查活动的通知。
            </marquee>
            <!-- <b>
              <br>
              关于津南区公立医院开展肿瘤筛查活动的通知。
              <br>
              <br>
              关于津南区公立医院开展肿瘤筛查活动的通知。
              <br>
              <br>
              关于津南区公立医院开展肿瘤筛查活动的通知。
            </b> -->
          </div>
        </div>
      </div>
    </div>
    <div class="main-index-piece">
      <div id="line"></div>
    </div>
  </div>
</template>

<script>
import ListStatus from '@/components/ListStatus/listStatus.vue' // list 状态

import { } from "@/api/dict.js" // 字典表接口文档

import { } from "@/assets/js/dict.js" // 字典表接口文档


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
  created: function () {
    this.handleSearch(); // 初始化查询列表

  },
  mounted: function () {
    this.handleEchartsLine(); // 饼状统计图

    this.handleEchartsPie(); // 饼状统计图
  },
  methods: {
    // 饼状统计图
    handleEchartsPie() {
      ;
      let pieCart = this.$echarts.init(document.getElementById('pie'))
      console.log('pie ----->', pieCart)
      let option = {
        color: ['#ffc770', '#47d6ff', '#479eff', 'rgba(255,255,255,.5)'],
        title: {
          text: '肺癌人数占比',
          left: 'center',
          bottom: '0px',
          textStyle: { //主标题文本样式
            fontSize: 18,
            color: '#5B9FF8',
            fontWeight: 'normal',
          },
        },

        tooltip: {
          trigger: 'item',
          padding: [10, 10, 10, 10],
          formatter: "{b} :<br/> {d}%"
        },

        series: [{
          name: '',
          type: 'pie',
          radius: ['30%', '50%'],
          center: ['50%', '50%'],
          label: {
            fontSize: 13,
            color: '#333',
            formatter: function (param) {
              return param.name + '{per' + param.dataIndex + '|' + param.percent.toFixed(0) + '%}';
            },
            rich: {
              per0: {
                // padding: [0, 0, 0, 5],
                fontSize: 13,
                fontWeight: 'bold',
                color: '#ffc770'
              },
              per1: {
                // padding: [0, 0, 0, 5],
                fontSize: 13,
                fontWeight: 'bold',
                color: '#47d6ff'
              },
              per2: {
                // padding: [0, 0, 0, 5],
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
            name: "数据模型筛选人数",
            value: "300"
          }, {
            name: "筛选结果复审已推出",
            value: "120"
          }, {
            name: "已做CT人数",
            value: "556"
          }]
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

    // 折线状统计图
    handleEchartsLine() {
      let lineCart = this.$echarts.init(document.getElementById('line'))
      let option = {
        title: {
          text: '肺癌人数发展趋势',
          left: 'center',
          align: 'right',
          top: 20,
          textStyle: { //主标题文本样式
            fontSize: 18,
            color: '#5B9FF8',
            fontWeight: 'normal',
          },
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          top: '20%'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['肺癌结果复审人数', '家庭医生查询人数', '家庭医生随访答应做CT人数', '肺癌中心已做CT人数',],
          top: '10%'
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
.main-index {
  // padding: 20px;
  // background-color: #fff;

  .main-index-piece {
    overflow: hidden;

    .main-index-echarts-list {
      height: auto;
      overflow: hidden;
      display: flex;
      .line-margin {
        margin: 0 5px;
      }
      .main-index-piece-item {
        background-color: #fff;
        border-radius: 10px;
        padding: 10px;
      }
      & > .main-index-piece {
        width: 50%;
        float: left;
        position: relative;

        & > #pie {
          width: 100%;
          height: 350px;
        }
      }

      .case {
        box-sizing: border-box;
        padding: 20px;
        width: 100%;
        height: 350px;
        text-align: center;
        // background: url(images/text-bk.png) no-repeat;
        background-size: 100% 100%;
        overflow: hidden;
        display: flex;
        marquee {
          flex: 1;
          color: #555;
        }
      }

      .case > b {
        position: absolute;
        animation-delay: 2s;
        animation: cellphone 12s linear infinite 1100ms;
        -moz-animation: cellphone 12s linear infinite 1100ms;
        -webkit-animation: cellphone 12s linear infinite 1100ms;
        -ms-animation: cellphone 12s linear infinite 1100ms;
        -o-animation: cellphone 12s linear infinite 1100ms;
      }

      @keyframes cellphone {
        0% {
          top: 0px;
        }

        100% {
          top: -200px;
        }
      }

      @-moz-keyframes cellphone {
        0% {
          top: 0px;
        }

        100% {
          top: -200px;
        }
      }

      @-webkit-keyframes cellphone {
        0% {
          top: 0px;
        }

        100% {
          top: -200px;
        }
      }

      @-ms-keyframes cellphone {
        0% {
          top: 0px;
        }

        100% {
          top: -200px;
        }
      }

      @-o-keyframes cellphone {
        0% {
          top: 0px;
        }

        100% {
          top: -200px;
        }
      }
    }

    & > #line {
      width: 100%;
      height: 400px;
      margin: 20px 0px;
      background-color: #fff;
      border-radius: 10px;
    }

    .main-index-list {
      position: relative;
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
.main-index-piece .input-with-select .el-select .el-input {
  width: 90px;
}

.main-index-piece .input-with-select .el-select .el-input input {
  padding: 0px 10px;
}

.main-index-piece .el-date-editor .el-range-separator {
  width: 10%;
}

.main-index-piece .el-date-editor--daterange.el-input__inner {
  width: 240px;
}
</style>
