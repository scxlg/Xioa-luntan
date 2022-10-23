import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import("@/views/home/home.vue"),
    redirect:'/home/topAsideAll',
    meta:{title: '掘金'}
  },
  {
    path: '/home',
    name: 'home',
    component: () => import("@/views/home/home.vue"),
    redirect:'/home/topAsideAll',
    meta:{title: '首页'},
    children:[
      {
        path: 'topAsideAll',
        name: 'topAsideAll',
        component: () => import("@/views/topAsideAll/topAsideAll.vue"),
        meta:{title: '综合'},
      },
      {
        path: '/boilingPoint',
        name: 'boilingPoint',
        component: () => import("@/views/boilingPoint/boilingPoint.vue"),
        redirect:'/boilingPoint/boilingPointChild',
        children:[
          {
            path: 'boilingPointChild',
            name: 'boilingPointChild',
            component: () => import("@/views/boilingPoint/boilingPointChild.vue"),
            props:true,
            meta:{title: '沸点'},
          },
        ]
      },
      {
        path:'/details',
        name: 'details',
        component: () => import("@/views/details/details.vue")
      }
    ]
  },
  {
    path: '/writeArticle',
    name:'writeArticle',
    component: () => import("@/views/writeArticle/writeArticle.vue"),
    meta:{title: '写文章-'},
  }
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHistory(),
  routes
})
router.beforeEach( (to,from,next) => {
  window.document.title = to.meta.title
  next()
})
export default router
