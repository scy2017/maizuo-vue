<template>
  <div>
    <!-- 海报 -->
    <div>
      <img v-lazy="filmInfo.poster" width="100%" />
    </div>
    <!-- 电影介绍 -->
    <div>
      <div>{{filmInfo.name}}</div>
      <div>{{filmInfo.category}}</div>
      <div>{{filmInfo.premiereAt | parsePremiereAt}}上映</div>
      <div>{{filmInfo.nation}} | {{filmInfo.runtime}}分钟</div>
      <div>{{filmInfo.synopsis}}</div>
    </div>
    <!-- 演职人员图片 -->
    <div>
      <!-- 滚动列表二次渲染的问题，图片显示不全，需要给子组件加上“key”属性，此时得考虑一个问题：如何让这个key在两次渲染的时候值不一样？
      - 思路：可以让key值与数据扯上关系，例如与数据的长度扯上关系
      - 问题：为什么key发生变化，swper就知道需要变化宽度呢？
      - 答：依据diff算法，key一旦发生变化，则组件会被重新渲染。这样一来宽度就会重新变化。
      -->
      <Actors :key="filmInfo.actors.length">
        <!-- 给插槽填坑的（放的就是演职人员的图片） -->
        <div class="swiper-slide" v-for="(item,index) in filmInfo.actors" :key="index">
          <img :src="item.avatarAddress" alt="" height="118">
        </div>
      </Actors>
    </div>
    <!-- 剧照 -->
    <div></div>
  </div>
</template>
<script>
import uri from '@/config/uri'
import Vue from 'vue'
import { Toast } from 'vant'
Vue.use(Toast)
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
  loading:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2962937242,1933230585&fm=26&gp=0.jpg'
})
import moment from 'moment'
import Actors from '@/views/Films/Actors'
export default{
  data(){
    return{
      // 刚开始的时候filmInfo默认为空，就会造成filmInfo.actors.length的长度为0，报undefined错误，所以要给他默认值
      filmInfo:{actors:[]}
    }
  },
  components:{
    Actors
  },
  created(){
    // 请求数据
    this.$http.get(uri.getFilmInfo + '?filmId=' + this.$route.params.filmId).then(res => {
      console.log(res);
      if(res.status == 0){
        // 成功获取数据
        this.filmInfo = res.data.film
      }else{
        // 请求失败
        Toast.fail(res.msg)
      }
    })
  },
  filters:{
    parsePremiereAt(timestamp){
      // 注意时间单位的转换
      return moment(timestamp * 1000).format('YYYY-MM-DD')
    }
  }
}

</script>