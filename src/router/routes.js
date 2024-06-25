const routes = [
  {
    path: '',
    // name: '空白页',
    redirect:"/login"
  },{
    path: '/login',
    name: 'login',
    title: '登录页',
    component: () => import('@/components/login.vue'),

  },
  {
    path: '/home',
    name: 'home',
    title: '首页',
    component: () => import('@/views/home.vue'),

  }
]
export default routes