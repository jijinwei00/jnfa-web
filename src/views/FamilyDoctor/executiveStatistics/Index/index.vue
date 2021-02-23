<template>
  <div class="executiveStatisticsIndex">
    <!-- 查询搜索项 -->
    <div class="executiveStatisticsIndex_query executiveStatisticsIndex_left">
      <div
        id="echarts_pie"
        style="width: 600px;height:400px;"
      ></div>
    </div>
    <!-- table 数据展示 -->
    <div class="executiveStatisticsIndex_right">
      <div class="executiveStatisticsIndex_table">
        <el-table
          :data="tableData"
          style="width: 100%"
          max-height="800"
        >
          <el-table-column
            prop="key"
            label="序号"
          />
          <el-table-column
            prop="wjff"
            label="问卷发放数"
          />
          <el-table-column
            prop="wjhs"
            label="问卷回收数"
          />
          <el-table-column
            prop="sfzxrs"
            label="随访执行人数"
          />
          <el-table-column
            prop="sfrs"
            label="失访人数"
          />
          <el-table-column
            prop="tfrs"
            label="脱访人数"
          />
          <el-table-column
            prop="wcrs"
            label="完成人数"
          />
        </el-table>
      </div>
      <!-- 分页底部展示 -->
      <div class="executiveStatisticsIndex_footer">
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

    </div>
  </div>
</template>

<script>
export default {
  name: 'executiveStatisticsIndex',//任务管理
  data() {
    return {
      total: 0, // 查询总数
      pageNum: 1, // 查询分页
      pageSize: 5, // 查询分页

      tableData: [{
        key: '1',
        wjff: '999',
        wjhs: '199',
        sfzxrs: '888',
        sfrs: '225',
        tfrs: '162',
        wcrs: '163',
      }, {
        key: '2',
        wjff: '999',
        wjhs: '199',
        sfzxrs: '888',
        sfrs: '225',
        tfrs: '162',
        wcrs: '163',
      }, {
        key: '3',
        wjff: '999',
        wjhs: '199',
        sfzxrs: '888',
        sfrs: '225',
        tfrs: '162',
        wcrs: '163',
      }, {
        key: '4',
        wjff: '999',
        wjhs: '199',
        sfzxrs: '888',
        sfrs: '225',
        tfrs: '162',
        wcrs: '163',
      }, {
        key: '5',
        wjff: '999',
        wjhs: '199',
        sfzxrs: '888',
        sfrs: '225',
        tfrs: '162',
        wcrs: '163',
      }, {
        key: '6',
        wjff: '999',
        wjhs: '199',
        sfzxrs: '888',
        sfrs: '225',
        tfrs: '162',
        wcrs: '163',
      },
      {
        key: '7',
        wjff: '999',
        wjhs: '199',
        sfzxrs: '888',
        sfrs: '225',
        tfrs: '162',
        wcrs: '163',
      }, {
        key: '8',
        wjff: '999',
        wjhs: '199',
        sfzxrs: '888',
        sfrs: '225',
        tfrs: '162',
        wcrs: '163',
      }, {
        key: '9',
        wjff: '999',
        wjhs: '199',
        sfzxrs: '888',
        sfrs: '225',
        tfrs: '162',
        wcrs: '163',
      }, {
        key: '10',
        wjff: '999',
        wjhs: '199',
        sfzxrs: '888',
        sfrs: '225',
        tfrs: '162',
        wcrs: '163',
      }],//table模拟数据
      currentPage: 1,
      total: 100,
    }
  },

  methods: {
    //  初始化echarts实例 
    drawChart() {
      let myChart = this.$echarts.init(document.getElementById("echarts_pie"));
      var colorList = [{
        type: 'linear',
        x: 0,
        y: 0,
        x2: 1,
        y2: 1,
        colorStops: [{
          offset: 0,
          color: 'rgba(51,192,205,0.01)' // 0% 处的颜色
        },
        {
          offset: 1,
          color: 'rgba(51,192,205,0.57)' // 100% 处的颜色
        }
        ],
        globalCoord: false // 缺省为 false
      },
      {
        type: 'linear',
        x: 1,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0,
          color: 'rgba(115,172,255,0.02)' // 0% 处的颜色
        },
        {
          offset: 1,
          color: 'rgba(115,172,255,0.67)' // 100% 处的颜色
        }
        ],
        globalCoord: false // 缺省为 false
      },
      {
        type: 'linear',
        x: 1,
        y: 0,
        x2: 0,
        y2: 0,
        colorStops: [{
          offset: 0,
          color: 'rgba(158,135,255,0.02)' // 0% 处的颜色
        },
        {
          offset: 1,
          color: 'rgba(158,135,255,0.57)' // 100% 处的颜色
        }
        ],
        globalCoord: false // 缺省为 false
      },
      {
        type: 'linear',
        x: 0,
        y: 1,
        x2: 0,
        y2: 0,
        colorStops: [{
          offset: 0,
          color: 'rgba(252,75,75,0.01)' // 0% 处的颜色
        },
        {
          offset: 1,
          color: 'rgba(252,75,75,0.57)' // 100% 处的颜色
        }
        ],
        globalCoord: false // 缺省为 false
      },
      {
        type: 'linear',
        x: 1,
        y: 1,
        x2: 1,
        y2: 0,
        colorStops: [{
          offset: 0,
          color: 'rgba(253,138,106,0.01)' // 0% 处的颜色
        },
        {
          offset: 1,
          color: '#FDB36ac2' // 100% 处的颜色
        }
        ],
        globalCoord: false // 缺省为 false
      },
      {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 1,
        y2: 0,
        colorStops: [{
          offset: 0,
          color: 'rgba(254,206,67,0.12)' // 0% 处的颜色
        },
        {
          offset: 1,
          color: '#FECE4391' // 100% 处的颜色
        }
        ],
        globalCoord: false // 缺省为 false
      }
      ]
      var colorLine = ['#33C0CD', '#73ACFF', '#9E87FF', '#FE6969', '#FDB36A', '#FECE43']

      function getRich() {
        let result = {}
        colorLine.forEach((v, i) => {
          result[`hr${i}`] = {
            backgroundColor: colorLine[i],
            borderRadius: 3,
            width: 3,
            height: 3,
            padding: [3, 3, 0, -12]
          }
          result[`a${i}`] = {
            padding: [8, -60, -20, -20],
            color: colorLine[i],
            fontSize: 12
          }
        })
        return result
      }
      let data = [
        { value: 335, name: '问卷发放数' },
        { value: 310, name: '问卷回收数' },
        { value: 274, name: '随访执行人数' },
        { value: 235, name: '失访人数' },
        { value: 400, name: '脱访人数' },
        { value: 490, name: '完成人数' }
      ].sort(function (a, b) { return a.value - b.value; })
      data.forEach((v, i) => {
        v.labelLine = {
          lineStyle: {
            width: 1,
            color: colorLine[i]
          }
        }
      })
      let option = {
        title: {
          text: '随访执行统计',
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
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [{
          name: '执行随访统计',
          type: 'pie',
          radius: '60%',
          center: ['50%', '50%'],
          clockwise: true,
          avoidLabelOverlap: true,
          label: {
            show: true,
            position: 'outside',
            formatter: function (params) {
              const name = params.name
              const percent = params.percent + '%'
              const index = params.dataIndex
              return [`{a${index}|${name}：${percent}}`, `{hr${index}|}`].join('\n')
            },
            rich: getRich()
          },
          itemStyle: {
            normal: {
              color: function (params) {
                return colorList[params.dataIndex]
              }
            }
          },
          data,
          roseType: 'radius'
        }]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    // 每页加载几条数据
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 分页-当前页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
  mounted() {
    this.drawChart()
  }
}
</script>


<style lang="scss" scoped>
.executiveStatisticsIndex {
  display: flex;
  .executiveStatisticsIndex_query {
    background: #fff;
    text-align: center;
    padding-top: 50px;
  }
  .executiveStatisticsIndex_left {
    margin-right: 10px;
  }
  .executiveStatisticsIndex_right {
    border-radius: 8px;
    background: #f6fbff;
    .executiveStatisticsIndex_table {
      background: #fff;
    }
    .executiveStatisticsIndex_footer {
      background: #fff;
    }
  }
}
.line {
  text-align: center;
}
</style>


