<template>
  <div class="menu">
    <el-scrollbar style="height:100%;overflow:hidden">
      <el-menu
        :router="true"
        :default-active="defaultActive"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        class="el-menu-vertical"
      >
        <div
          v-for="(item,index) in menuListIcon"
          :key="index"
        >
          <!-- 无子菜单 -->
          <el-menu-item
            v-if="!item.childrens"
            :route="{path: item.path}"
            :index="item.path"
          >
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
          <!-- 有子菜单 -->
          <el-submenu
            v-else
            :index="item.path"
          >
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item
              v-for="(i,num) in item.childrens"
              :key="num"
              :index="i.path"
            >{{i.name}}</el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      defaultActive: this.$route.fullPath,
      menuList: [],
      menuListIcon: [{
        name: '首页',
        icon: 'iconfont icon-home-active',
        path: '/home/index',
      },
      {
        name: '基层医疗卫生机构',
        icon: 'iconfont icon-menhuwangzhan',
        path: '/screening',
        childrens: [{
          name: '个案信息',
          path: '/case/index'
        }, {
          name: '高风险底册',
          path: '/highRisk/index'
        }, {
          name: '随访计划',
          path: '/followUp/index'
        }, {
          name: '随访任务',
          path: '/followUpTask/index'
        }, {
          name: '工作进度',
          path: '/workProgress/index'
        }, {
          name: '账号管理',
          path: '/screening/acountManagement/index'
        }],
      },
      {
        name: '肺癌筛查治疗中心',
        icon: 'iconfont icon-huabanbeifen',
        path: "/familyDoctor",
        childrens: [{
          name: '高风险底册级别设置',
          path: '/highDataQuery/index'
        }, {
          name: '制定随访计划',
          path: '/planningManagement/index'
        }, {
          name: '数据查询',
          path: '/processTracking/index'
        }, {
          name: '知情同意书打印',
          path: '/planReminder/index'
        }, {
          name: '统计分析',
          path: '/executiveStatistics/index'
        }, {
          name: '账号管理',
          path: '/familyDoctor/acountManagement/index'
        }]
      },
      {
        name: '监管机构',
        icon: 'iconfont icon-jiaoyukeyan',
        path: '/regulators',
        childrens: [{
          name: '个案信息',
          path: '/screeningTests/index'
        }, {
          name: '高风险底册',
          path: '/monitoringFamilyDoctors/index'
        }, {
          name: '随访计划',
          path: '/crossMonitoring/index'
        }, {
          name: '随访任务',
          path: '/diseaseSurveillance/index'
        }, {
          name: '工作进度',
          path: '/factorMonitoring/index'
        }, {
          name: '账号管理',
          path: '/regulators/acountManagement/index'
        },

          // {
          //   name: '趋势分析统计',
          //   path: '/trendStatistics/index'
          // }, {
          //   name: '随访指标制定',
          //   path: '/indicatorDevelopment/index'
          // }, {
          //   name: '随访过程监控',
          //   path: '/processMonitoring/index'
          // }, {
          //   name: '随访权限管理',
          //   path: '/authorityManagement/index'
          // }, {
          //   name: '辅助决策',
          //   path: '/assistantDecision/index'
          // },
        ]
      },
      {
        name: '系统管理',
        icon: 'iconfont icon-xuekeguanli',
        path: '/systemManagement',
        childrens: [{
          name: '用户管理',
          path: '/userManagement/index'
        }, {
          name: '操作日志查询',
          path: '/logQuery/index'
        },
        {
          name: '通知内容管理',
          path: '/notificationArticle/index'
        }]
      },
      ]
    };
  },
  created: function () {
    this.menuList = this.menuListIcon
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped lang="scss">
.menu {
  width: auto;
  height: calc(100vh - 56px - 16px - 4px);
  background-color: #fff;
  border-right: 1px solid #e6e6e6;
  position: relative;
  margin: 8px;

  .el-menu-vertical .is-active:not(.is-opened) {
    background: #a7c9ec;

    i,
    span {
      color: #367abf;
      vertical-align: unset;
    }
  }

  .el-menu {
    border-right: none;

    div.el-submenu__title + ul.el-menu--inline {
      li.el-menu-item {
        height: 40px;
        line-height: 40px;

        &:hover,
        &.is-active {
          color: #2476c2;
          background: #d6eafd;
        }
      }
    }

    .el-menu-item,
    .el-submenu {
      color: #333;
      height: auto;
      line-height: 48px;
      min-width: inherit;

      &:hover {
        width: 100%;
        // height: 48px;
        line-height: 48px;
      }
    }

    .el-submenu {
      color: #333;
      // height: 48px;
      // line-height: 48px;
      min-width: inherit;
    }

    &:not(.el-menu--collapse) {
      width: 200px;
      font-size: 14px;
    }

    .iconfont {
      font-size: 14px;
    }
  }

  .menu-collapse {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
    color: #909399;
    border: 1px solid #e6e6e6;
    background-color: #fff;
    cursor: pointer;
  }
}
</style>

<style>
/* .menu .el-submenu__icon-arrow {
  right: 10px;
  top: 55%;
}

.menu .el-submenu__title {
  height: 48px;
  line-height: 48px;
  overflow: hidden;
} */
</style>
