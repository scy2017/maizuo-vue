// 引入相关库文件
import Vue from 'vue'
import VueRouter from 'vue-router'

// VueRouter引入到Vue类中
Vue.use(VueRouter)

// 导入需要使用的组件
import filmRouter from './routes/film'
import cinemaRouter from './routes/cinema'
import centerRouter from './routes/center'
// 路由
//  1.电影模块
//    1)电影模块(父) films
//        正在热映 nowPlaying
//        即将上映 comingSoon
//    2)电影详情模块 film/:id
//  2.影院模块 cinemas
//  3.我的模块 center
// 定义路由规则
const routes = [
  {
    path:'/',
    redirect:'/films/nowPlaying'
  },
  ...filmRouter,
  cinemaRouter,
  centerRouter
]

// 创建路由实例
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 导出路由
export default router
