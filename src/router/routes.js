const routes = [{
    path: '',
    // name: '空白页',
    redirect: "/login"
  }, {
    path: '/login',
    name: 'login',
    meta:{
      title: '登录页',
    },
    component: () => import('@/components/login.vue'),

  },
  {
    path: '/home',
    name: 'home',
    meta:{
      title: '首页',
    },
    component: () => import('@/views/home.vue'),
    children: [{
      path: '/printEffect',
      name: 'printEffect',
      meta:{
        title: '打印效果',
      },
      component: () => import('@/components/printEffect.vue'),
    },
    {
      path: '/cyclicRolling',
      name: 'cyclicRolling',
      meta:{
        title: '循环滚动',
      },
      component: () => import('@/components/cyclicRolling.vue'),
    },
    {
      path: '/getVerificationCode',
      name: 'getVerificationCode',
      meta:{
        title: '获取验证码',
      },
      component: () => import('@/components/getVerificationCode.vue'),
    },
    {
      path: '/shareScreen',
      name: 'shareScreen',
      meta:{
        title: '分享屏幕',
      },
      component: () => import('@/components/shareScreen.vue'),
    },
    {
      path: '/electronicSignature',
      name: 'electronicSignature',
      meta:{
        title: '电子签名',
      },
      component: () => import('@/components/electronicSignature.vue'),
    }]

  }
]
export default routes