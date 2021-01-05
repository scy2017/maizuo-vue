<template>
  <div>
    <!-- v-show控制组件是否显示 -->
    <div class="loading" v-show="isLoading" >
      <van-loading size="24px" type="spinner">加载中...</van-loading>
    </div>
    <!-- 列表内容 -->
    <van-card v-for="item in list" :key="item.filmId">
      <!-- 电影封面图 -->
      <template #thumb>
        <img :src="item.poster" alt="" width="66">
      </template>
      <!-- 电影名称 -->
      <template #title>
        <div>
          <span class="name">{{item.name}}</span>
          <span class="item">{{item.filmType.name}}</span>
        </div>
      </template>
      <!-- 电影相关信息 -->
      <template #desc>
        <div class="lable">观众评分 <span class="grade">{{item.grade}}</span></div>
        <div class="lable">主演：{{item.actors | parseActors}}</div>
        <div class="lable">{{item.nation}} | {{item.runtime}}分钟</div>
        <!-- 按钮 -->
        <div class="nowPlayingFilm-buy">购票</div>
      </template>
    </van-card>
  </div>
</template>
<script>
import uri from '@/config/uri'
import Vue from 'vue'
import { Loading, Toast, Card} from 'vant'
Vue.use(Loading)
Vue.use(Toast)
Vue.use(Card)
export default{
  data(){
    return{
      // 列表的数据源
      list:[],
      // 控制加载组件是否显示
      isLoading:true
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
    this.$http.get(uri.getNowPlaying).then(res => {
      if(res.status == 0){
        // 请求成功
        this.list = res.data.films
      }else{
        // 请求失败
        Toast.fail('网络繁忙')
      }
      // 数据加载完成，去除加载组件的显示
      this.isLoading = false
    })
  }
}
</script>
<style lang="scss" scoped>
  .loading{
    text-align: center;
    margin-top: 5px;
  }
  .van-card__thumb{
    width: 70px;
  }
  img{
    border-radius: 0;
  }
  .name{
    max-width: calc(100% - 25px);
    color: #191a1b;
    font-size: 16px;
    height: 22px;
    line-height: 22px;
    margin-right: 5px;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    margin-top: 4px;
    font-size: 12px;
  }
  .nowPlayingFilm-buy{
    line-height: 40px;
    height: 40px;
    width: 80px;
    color: #ff5f16;
    font-size: 20px;
    text-align: center;
    position: relative;
    transform: scale(.5);
    border: 1px solid #ff5f16;
    top: -50%;
    right: -75%;
    border-radius: 4px;
  }
</style>