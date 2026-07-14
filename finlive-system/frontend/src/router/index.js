import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../pages/Login.vue')
  },
  {
    path: '/engineer',
    name: 'Engineer',
    component: () => import('../pages/engineer/EngineerHome.vue'),
    children: [
      { path: '', name: 'EngineerDashboard', component: () => import('../pages/engineer/Dashboard.vue') },
      { path: 'questions', name: 'EngineerQuestions', component: () => import('../pages/engineer/Questions.vue') },
      { path: 'users', name: 'EngineerUsers', component: () => import('../pages/engineer/Users.vue') },
      { path: 'settings', name: 'EngineerSettings', component: () => import('../pages/engineer/Settings.vue') }
    ]
  },
  {
    path: '/company',
    name: 'Company',
    component: () => import('../pages/company/CompanyHome.vue'),
    children: [
      { path: '', name: 'CompanyDashboard', component: () => import('../pages/company/Dashboard.vue') },
      { path: 'ask', name: 'CompanyAsk', component: () => import('../pages/company/AskQuestion.vue') },
      { path: 'history', name: 'CompanyHistory', component: () => import('../pages/company/QuestionHistory.vue') },
      { path: 'settings', name: 'CompanySettings', component: () => import('../pages/company/Settings.vue') }
    ]
  },
  {
    path: '/expert',
    name: 'Expert',
    component: () => import('../pages/expert/ExpertHome.vue'),
    children: [
      { path: '', name: 'ExpertDashboard', component: () => import('../pages/expert/Dashboard.vue') },
      { path: 'tasks', name: 'ExpertTasks', component: () => import('../pages/expert/Tasks.vue') },
      { path: 'history', name: 'ExpertHistory', component: () => import('../pages/expert/TaskHistory.vue') },
      { path: 'profile', name: 'ExpertProfile', component: () => import('../pages/expert/Profile.vue') }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('finlive_token')
  if (!token && to.path !== '/') {
    next('/')
  } else {
    next()
  }
})

export default router
