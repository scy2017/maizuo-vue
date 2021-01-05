<template>
  <div>
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
      urls:['/films/nowPlaying','/films/comingSoon']
    }
  },
  created(){
    this.active = this.urls.indexOf(this.$route.path)
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
</style>