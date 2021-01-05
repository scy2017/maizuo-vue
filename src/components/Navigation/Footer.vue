<template>
  <div>
    <van-tabbar v-model="active" active-color="#ff5f16" inactive-color="#000" @change="changeItem">
      <van-tabbar-item>
        <van-icon class-prefix="iconfont icon-dianying" size="1.5rem" slot="icon"></van-icon>
        <span>电影</span>
      </van-tabbar-item>
      <van-tabbar-item>
        <van-icon class-prefix="iconfont icon-yingyuan" size="1.5rem" slot="icon"></van-icon>
        <span>影院</span>
      </van-tabbar-item>
      <van-tabbar-item>
        <van-icon class-prefix="iconfont icon-My" size="1.5rem" slot="icon"></van-icon>
        <span>我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import '@/assets/font/iconfont.css'
import Vue from 'vue'
import { Tabbar, TabbarItem, Icon} from 'vant'
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Icon)

export default{
  data(){
    return {
      // 底部导航的默认索引(默认选择第1个)
      active:0,
      // 定义底部导航需要的三个地址(按顺序书写)
      urls:['/films/nowPlaying','/cinemas','/center']
    }
  },
  created(){
    // 纠正页面刷新之后索引归零的问题
    // 获取路由信息 this.$route.path
    // indexOf() 获取数组中指定的索引
    this.active = this.urls.indexOf(this.$route.path)
  },
  methods:{
    changeItem(index){
      this.$router.push(this.urls[index])
    }
  }
}
</script>