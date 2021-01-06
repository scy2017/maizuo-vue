<template>
  <div class="container">
    <!-- 下拉刷新页面 -->
    <van-pull-refresh
      v-model="isLoading2"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
      <!-- v-show控制组件是否显示 -->
      <div class="loading" v-show="isLoading" >
        <van-loading size="24px" type="spinner">加载中...</van-loading>
      </div>
      <!-- 列表内容 -->
      <van-card v-for="item in list" :key="item.filmId" @click="goDetail(item.filmId)">
        <!-- 电影封面图 -->
        <template #thumb>
          <img :src="item.poster" alt="" width="66">
        </template>
        <!-- 电影名称 -->
        <template #title>
          <div class="title">
            {{item.name}}
            <span class="item">{{item.filmType.name}}</span>
          </div>
        </template>
        <!-- 电影相关信息 -->
        <template #desc>
          <div class="lable">
            <!-- 按钮 -->
            <div class="nowPlayingFilm-buy">购票</div>
            <div>观众评分 <span class="grade">{{item.grade}}</span></div>
            <div>主演：{{item.actors | parseActors}}</div>
            <div>{{item.nation}} | {{item.runtime}}分钟</div>
          </div>
        </template>
      </van-card>
    </van-pull-refresh>
  </div>
</template>
<script>
import uri from '@/config/uri'
import Vue from 'vue'
import { Loading, Toast, Card, PullRefresh} from 'vant'
Vue.use(Loading)
Vue.use(Toast)
Vue.use(Card)
// 下拉刷新
Vue.use(PullRefresh)
export default{
  data(){
    return{
      // 列表的数据源
      list:[],
      // 控制加载组件是否显示
      isLoading:true,
      // 控制下拉刷新的加载提示的
      isLoading2:true,
      // 默认页码
      pageNum:1
    }
  },
  methods:{
    goDetail(filmId){
      // 点击去到影片详情页
      this.$router.push('/film/' + filmId)
    },
    onRefresh(){
      this.getData()
    },
    // 发送请求获取数据
    getData(){
      this.$http.get(uri.getNowPlaying + '?pageNum=' + this.pageNum).then(res => {
        if(res.status == 0){
          if(this.pageNum <= Math.ceil(res.data.total / 10)){
            // 获取数据成功
            this.list = [...res.data.films,...this.list]
            // 让页面+1
            this.pageNum ++
          }
        }else{
          // 请求失败
          Toast.fail('网络繁忙')
        }
        // 数据加载完成，去除加载组件的显示
        this.isLoading = false
        // 数据请求回来之后让下拉刷新的加载提示信息消失
        this.isLoading2 = false
      })
    }
  },
  filters:{
    // 处理演员的信息
    parseActors(actors){
      // 由于卖座网的数据可能存在部分电影没有主演（没有actors属性）
      if(actors){
        // 有主演
        let str = ''
        actors.forEach(item => {
          str += item.name + ' '
        })
        //截取字符串： substr(开始索引，截取多少个)
        return str.substr(0,15) + '...'
      }else{
        // 没有主演
        return '暂无主演'
      }
    }
  },
  created(){
    this.getData()
  }
}
</script>
<style lang="scss" scoped>
  .loading{
    text-align: center;
    padding-top: 5px;
  }
  .van-card__thumb{
      width: 66px;
      height: 92px;
  }
  img{
    border-radius: 0;
  }
  .title{
   font-size: 16px;
  }
  .item{
    font-size: 9px;
    color: #fff;
    background-color: #d2d6dc;
    height: 14px;
    line-height: 14px;
    padding: 0 2px;
    border-radius: 2px;
  }
  .grade{
    color: #ffb232;
    font-size: 14px;
  }
  .lable{
    font-size: 13px;
  }
  .nowPlayingFilm-buy {
    float: right;
    line-height: 25px;
    height: 25px;
    width: 50px;
    color: #ff5f16;
    font-size: 13px;
    text-align: center;
    border: 1px solid #ff5f16;
    border-radius: 4px;
  }
 .container {
    margin-bottom: 100px;
 }
</style>