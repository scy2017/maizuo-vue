<template>
  <div :class="{header:isSticky}">
    <van-tabs v-model="active" @click="onClick" line-width="55px">
      <van-tab title="正在热映" class="title-style"></van-tab>
      <van-tab title="即将上映" class="title-style"></van-tab>
    </van-tabs>
  </div>
</template>
<script>
import Vue from 'vue'
import { Tab, Tabs } from 'vant'
Vue.use(Tab)
Vue.use(Tabs)
export default{
  data(){
    return{
      active:0,
      urls:['/films/nowPlaying','/films/comingSoon'],
      // 控制是否显示头部信息
      isSticky:false
    }
  },
  created(){
    this.active = this.urls.indexOf(this.$route.path)
  },
  // 页面加载完成之后获取滚动条的高度
  mounted(){
    window.addEventListener('scroll',() => {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if(scrollTop >= 150){
        this.isSticky = true
      }else{
        this.isSticky = false
      }
    })
  },
  methods:{
    onClick(index){
      this.$router.push(this.urls[index])
    }
  }
}
</script>
<style lang="scss" scoped>
  .title-style{
    color: #ff5f16;
  }
  .header{
    position: fixed;
    z-index: 999;
    width: 100%;
  }
</style>