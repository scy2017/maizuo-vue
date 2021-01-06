<template>
  <div class="container">
    <!-- 实现上滑刷新效果 -->
    <van-list
      v-model="isLoading"
      :finished="finished"
      finished-text="我是有底线的"
      @load="onLoad"
    >
      <van-card v-for="item in list" :key="item.filmId">
        <!-- 封面图片 -->
        <template #thumb>
          <img :src="item.poster" alt="">
        </template>
        <!-- 电影名称 -->
        <template #title>
          <div class="title">
            {{item.name}}
            <span class="item">{{item.filmType.name}}</span>
          </div>
        </template>
        <!-- 电影的介绍 -->
        <template #desc>
          <div class="desc">
            <div class="nowPlayingFilm-buy">预约</div>
            <div>主演:{{item.actors | parseActors}}</div>
            <div>上映日期:{{item.premiereAt | parsePremiereAt}}</div>
          </div>
        </template>
      </van-card>
    </van-list>
  </div>
</template>
<script>
import uri from '@/config/uri'
import Vue from 'vue'
import { Loading, Card, List, Toast} from 'vant'
Vue.use(Loading)
Vue.use(Card)
Vue.use(List)
Vue.use(Toast)
import moment from 'moment'
export default{
  data(){
    return{
      // 列表数据源
      list:[],
      // 控制加载组件是否显示
      isLoading:true,
      // 默认页码
      pageNum:1,
      // 用于标记是否还有数据没请求完
      finished:false
    }
  },
  methods:{
    onLoad(){
      // 发送请求获取数据
      this.getData()
    },
    getData(){
      this.$http.get(uri.getComingSoon + '?pageNum=' + this.pageNum).then(res => {
        if(res.status == 0){
          if(this.pageNum <= Math.ceil(res.data.total / 10)){
            // 成功获取数据
            this.list = [...this.list,...res.data.films]
            // 让页码+1
            this.pageNum ++
          }else{
            // 没有数据（显示加载完成）
            this.finished = true
          }
        }else{
          // 请求失败
          Toast.fail("网络繁忙")
        }
        // 数据加载完成，去除加载组件的显示
        this.isLoading = false;
      })
    }
  },
  filters:{
    parseActors(actors){
      // 由于卖座网的数据可能存在部分电影没有主演（没有actors属性）
      if(actors){
        let str = ''
        actors.forEach(item => {
          str += item.name + ' '
        })
         return str.substr(0,15) + '...'
      }else{
        return '暂无主演'
      }
    },
    parsePremiereAt(timestamp){
      // 周几的数组（可以避免去使用分支判断）
      const arr = ['周日','周一','周二','周三','周四','周五','周六']
      // 注意时间单位的问题，接口返回的时间单位是秒，而moment时间单位是毫秒
      // 周几
      const week = arr[moment(timestamp * 1000).format('e')]
      // 月
      const month = moment(timestamp * 1000).format('M')
      // 日
      const day = moment(timestamp * 1000).format('D')
      return `${week} ${month}月${day}日`
    }
  },
  created(){
    // 发送请求获取数据
    this.getData()
  }
}
</script>
<style lang="scss" scoped>
  .loading{
    text-align: center;
    margin-top: 5px;
  }
  img{
    width: 66px;
    border-radius: 0;
  }
  // 样式设置
  .title {
      font-size: 16px;
      color: black;
      margin-top: 10px;
  }
  // 2D/3D样式
  .item {
      font-size: 9px;
      color: #fff;
      background-color: #d2d6dc;
      height: 14px;
      line-height: 14px;
      padding: 0 2px;
      border-radius: 2px;
  }
  // 评分样式
  .grade {
      color: #ffb232;
      font-size: 14px;
  }
  // 描述部分样式
  .desc {
      font-size: 13px;
  }
  // 购票按钮样式
  .nowPlayingFilm-buy {
      float: right;
      line-height: 25px;
      height: 25px;
      width: 50px;
      color: #ff5f16;
      font-size: 13px;
      text-align: center;
      border-radius: 2px;
      border: 1px solid #ff5f16;
      border-radius: 4px;
  }
  // 设置图片预览区域的宽度为66px（默认为88px）
  .van-card__thumb {
      width: 66px;
      height: 92px;
  }
  .container {
      margin-bottom: 50px;
  }
</style>