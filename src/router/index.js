import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home/home'
import Login from '@/views/Login/login'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login',
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            children: [{
                path: '/home/index',
                component: () => import('@/views/Main/main'),
                name: 'main',
                meta: {
                    title: '首页',
                    pageLevel: 1
                },
            }]
        },
        {
            path: '/screening',
            name: 'screening',
            component: Home,
            redirect: '/case/index',
            children: [
                {
                    path: '/case/index',
                    component: () => import('@/views/Screening/case/Index/index'),
                    name: 'case',
                    meta: {
                        title: '个案信息',
                        pageLevel: 1
                    },
                },
                {
                    path: '/dataModel/index',
                    component: () => import('@/views/Screening/dataModel/Index/index'),
                    name: 'dataModel',
                    meta: {
                        title: '数据模型指标设置',
                        pageLevel: 1
                    },
                }, {
                    path: '/taskManagement/index',
                    component: () => import('@/views/Screening/taskManagement/Index/index'),
                    name: 'taskManagement',
                    meta: {
                        title: '高风险底册',
                        pageLevel: 1
                    },
                }, {
                    path: '/dataQuery/index',
                    component: () => import('@/views/Screening/dataQuery/Index/index'),
                    name: 'dataQuery',
                    meta: {
                        title: '随访计划',
                        pageLevel: 1
                    },
                }, {
                    path: '/screeningReview/index',
                    component: () => import('@/views/Screening/screeningReview/Index/index'),
                    name: 'screeningReview',
                    meta: {
                        title: '随访任务',
                        pageLevel: 1
                    },
                }, {
                    path: '/statisticalAnalysis/index',
                    component: () => import('@/views/Screening/statisticalAnalysis/Index/index'),
                    name: 'statisticalAnalysis',
                    meta: {
                        title: '工作进度',
                        pageLevel: 1
                    },
                }, {
                    path: '/systemManagement/index',
                    component: () => import('@/views/Screening/systemManagement/Index/index'),
                    name: 'systemManagement',
                    meta: {
                        title: '账号管理',
                        pageLevel: 1
                    },
                }]
        },
        {
            path: '/familyDoctor',
            name: '肺癌筛查治疗中心',
            component: Home,
            redirect: '/highDataQuery/index',
            children: [{
                path: '/highDataQuery/index',
                component: () => import('@/views/FamilyDoctor/highDataQuery/Index/index'),
                name: 'highDataQuery',
                meta: {
                    title: '高风险底册级别设置',
                    pageLevel: 1
                },
            }, {
                path: '/planningManagement/index',
                component: () => import('@/views/FamilyDoctor/planningManagement/Index/index'),
                name: 'planningManagement',
                meta: {
                    title: '制定随访计划',
                    pageLevel: 1
                },
            }, {
                path: '/processTracking/index',
                component: () => import('@/views/FamilyDoctor/processTracking/Index/index'),
                name: 'processTracking',
                meta: {
                    title: '数据查询',
                    pageLevel: 1
                },
            }, {
                path: '/planReminder/index',
                component: () => import('@/views/FamilyDoctor/planReminder/Index/index'),
                name: 'planReminder',
                meta: {
                    title: '知情同意书打印',
                    pageLevel: 1
                },
            }, {
                path: '/executiveStatistics/index',
                component: () => import('@/views/FamilyDoctor/executiveStatistics/Index/index'),
                name: 'executiveStatistics',
                meta: {
                    title: '统计分析',
                    pageLevel: 1
                },
            }]
        },
        {
            path: '/regulators',
            name: '监管机构',
            component: Home,
            redirect: '/screeningTests/index',
            children: [{
                path: '/screeningTests/index',
                component: () => import('@/views/Regulators/screeningTests/Index/index'),
                name: 'screeningTests',
                meta: {
                    title: '个案信息',
                    pageLevel: 1
                },
            }, {
                path: '/monitoringFamilyDoctors/index',
                component: () => import('@/views/Regulators/monitoringFamilyDoctors/Index/index'),
                name: 'monitoringFamilyDoctors',
                meta: {
                    title: '高风险底册',
                    pageLevel: 1
                },
            }, {
                path: '/crossMonitoring/index',
                component: () => import('@/views/Regulators/crossMonitoring/Index/index'),
                name: 'crossMonitoring',
                meta: {
                    title: '随访计划',
                    pageLevel: 1
                },
            },
            {
                path: '/diseaseSurveillance/index',
                component: () => import('@/views/Regulators/diseaseSurveillance/Index/index'),
                name: 'diseaseSurveillance',
                meta: {
                    title: '肺癌高危人群发病监测',
                    pageLevel: 1
                },
            }, {
                path: '/factorMonitoring/index',
                component: () => import('@/views/Regulators/factorMonitoring/Index/index'),
                name: 'factorMonitoring',
                meta: {
                    title: '肺癌因素监测',
                    pageLevel: 1
                },
            }, {
                path: '/trendStatistics/index',
                component: () => import('@/views/Regulators/trendStatistics/Index/index'),
                name: 'trendStatistics',
                meta: {
                    title: '趋势分析统计',
                    pageLevel: 1
                },
            }, {
                path: '/indicatorDevelopment/index',
                component: () => import('@/views/Regulators/indicatorDevelopment/Index/index'),
                name: 'indicatorDevelopment',
                meta: {
                    title: '随访指标制定',
                    pageLevel: 1
                },
            }, {
                path: '/processMonitoring/index',
                component: () => import('@/views/Regulators/processMonitoring/Index/index'),
                name: 'processMonitoring',
                meta: {
                    title: '随访过程监控',
                    pageLevel: 1
                },
            }, {
                path: '/authorityManagement/index',
                component: () => import('@/views/Regulators/authorityManagement/Index/index'),
                name: 'authorityManagement',
                meta: {
                    title: '随访权限管理',
                    pageLevel: 1
                },
            }, {
                path: '/assistantDecision/index',
                component: () => import('@/views/Regulators/assistantDecision/Index/index'),
                name: 'assistantDecision',
                meta: {
                    title: '辅助决策',
                    pageLevel: 1
                },
            }
            ]
        },
        {
            path: '/systemManagement',
            name: '系统管理',
            component: Home,
            redirect: '/userManagement/index',
            children: [{
                path: '/userManagement/index',
                component: () => import('@/views/systemManagement/userManagement/Index/index'),
                name: 'userManagement',
                meta: {
                    title: '用户管理',
                    pageLevel: 1
                },
            }, {
                path: '/logQuery/index',
                component: () => import('@/views/systemManagement/logQuery/Index/index'),
                name: 'logQuery',
                meta: {
                    title: '操作日志查询',
                    pageLevel: 1
                },
            }, {
                path: '/notificationArticle/index',
                component: () => import('@/views/systemManagement/notificationArticle/index'),
                name: 'notificationArticle',
                meta: {
                    title: '通知内容管理',
                    pageLevel: 1
                },
            }]
        },
    ]
})
