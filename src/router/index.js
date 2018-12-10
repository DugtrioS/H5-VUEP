import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/testcases',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'testcases',
        component: () => import('@/views/testcases/index'),
        meta: { title: '快速索引', icon: 'form' }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/env',
    name: 'Setting',
    meta: { title: '系统管理', icon: 'example' },
    children: [
      {
        path: 'env',
        name: 'env',
        component: () => import('@/views/env/index'),
        meta: { title: '环境管理', icon: 'example' }
      },
      {
        path: 'Resources',
        name: 'Resources',
        component: () => import('@/views/env/automation/Resources'),
        meta: { title: '资源管理', icon: 'example' },
        children: [
          {
            hidden: true,
            path: '/setting/automationtest/project=:project_id',
            component: () => import('@/views/env/automation/CaseList'),
            name: '用例列表'
          },
          {
            hidden: true,
            path: '/setting/automationtest/project=:project_id/first=:firstGroup',
            component: () => import('@/views/env/automation/CaseListGroup'),
            name: '分组用例列表'
          },
          {
            hidden: true,
            path: '/setting/caseApiList/project=:project_id/case=:case_id',
            component: () => import('@/views/env/automation/CaseListGroup'),
            name: '用例接口列表'
          },
          {
            hidden: true,
            path: '/setting/addCaseApi/project=:project_id/case=:case_id',
            component: () => import('@/views/env/automation/AddCaseApi'),
            name: '用例接口列表'
          },
          {
            hidden: true,
            path: '/settingddCaseApi/updateCaseApi/project=:project_id/case=:case_id/api=:api_id',
            component: () => import('@/views/env/automation/UpdateCaseApi'),
            name: '修改接口'
          },
          {
            hidden: true,
            path: '/settingddCaseApi/testReport/project=:project_id',
            component: () => import('@/views/env/automation/TestReport'),
            name: '测试报告'
          }
        ]
      }
    ]
  },
  {
    path: '/env',
    component: Layout,
    redirect: '/env/index',
    name: 'Env',
    meta: { title: '接口管理', icon: 'example' },
    children: [
      {
        path: 'rawapi',
        name: 'Rawapi',
        component: () => import('@/views/env/rawapi'),
        meta: { title: '接口维护', icon: 'example' }
      },
      {
        path: 'apiaction',
        name: 'ApiAction',
        component: () => import('@/views/env/apiaction'),
        meta: { title: '接口场景', icon: 'example' }
      }
    ]
  },
  {
    path: '/common',
    component: Layout,
    redirect: '/common/index',
    name: 'Common',
    meta: { title: '业务管理', icon: 'example' },
    children: [
      {
        path: 'commonpoint',
        name: 'CommonPoint',
        component: () => import('@/views/tree/index'),
        meta: { title: '功能点维护', icon: 'example' }
      }
    ]
  },
  {
    path: '/cases',
    component: Layout,
    // redirect: '/cases/table',
    name: 'Cases',
    meta: { title: '用例管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '用例列表', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '用例关系树', icon: 'tree' }
      },
      {
        path: 'api',
        name: 'CaseApi',
        component: () => import('@/views/table/index'),
        meta: { title: '接口用例', icon: 'table' }
      },
      {
        path: 'uiautocases',
        name: 'UiAutoCases',
        component: () => import('@/views/table/UiAutoCases'),
        meta: { title: 'UI用例', icon: 'table' }
      },
      {
        path: 'newuicases',
        name: 'NewUiCase',
        component: () => import('@/views/table/NewUiCase'),
        meta: { title: 'UI场景用例管理', icon: 'table' }
      }
    ]
  },
  {
    path: '/report',
    component: Layout,
    redirect: '/report/index',
    name: 'Report',
    meta: { title: '报告', icon: 'form' },
    children: [
      {
        path: 'reportlist',
        name: 'ReportList',
        component: () => import('@/views/report/reportlist'),
        meta: { title: '报告列表', icon: 'form' }},
      {
        path: 'reportlistJ',
        component: () => import('@/views/report/reportlistJ'),
        name: 'ApirePort',
        meta: { title: 'API报告', icon: 'form' }
      },
      {
        path: 'uireport',
        component: () => import('@/views/report/uireport'),
        name: 'UiReport',
        meta: { title: 'UI报告', icon: 'form' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'form', icon: 'form' }
      }
    ]
  },

  {
    path: '/fortest',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'fortest',
        component: () => import('@/views/testcases/dndList'),
        meta: { title: 'fortest', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: '',
        meta: { title: 'OPENSTF', icon: 'link' }
      }
    ]
  },
  {
    path: '/interface',
    redirect: '/views/table/index',
    component: Layout,
    hidden: true,
    children: [{
      path: '/views/table/interface',
      component: () => import('@/views/table/interface')
    }]
  },
  {
    path: '/newcases',
    redirect: '/views/table/index',
    component: Layout,
    hidden: true,
    children: [{
      path: '/views/table/newcases',
      component: () => import('@/views/table/newcases')
    }]
  },
  {
    path: '/newuiaction',
    redirect: '/views/table/index',
    component: Layout,
    hidden: true,
    children: [{
      path: '/views/testcases/dndlist',
      component: () => import('@/views/testcases/dndlist')
    }]
  },
  {
    path: '/newapiaction',
    redirect: '/views/table/index',
    component: Layout,
    hidden: true,
    children: [{
      path: '/views/testcases/dndApilist',
      component: () => import('@/views/testcases/dndApilist')
    }]
  },
  {
    path: '/reportdetail',
    redirect: '/views/report/reportlist',
    component: Layout,
    hidden: true,
    children: [{
      path: '/views/report/reportdetail',
      component: () => import('@/views/report/reportdetail')
    }]
  },
  {
    path: '/casesdetails',
    redirect: '/views/tree/index',
    component: Layout,
    hidden: true,
    children: [{
      path: '/views/tree/casesdetails',
      component: () => import('@/views/tree/casesdetails')
    }]
  },
  {
    path: '/casesdetails',
    redirect: '/views/env/automation',
    component: Layout,
    hidden: true,
    children: [{
      path: '/views/tree/casesdetails',
      component: () => import('@/views/env/automation/CaseList')
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
