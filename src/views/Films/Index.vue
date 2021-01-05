<template>
  <div>
    <Header />
    <!-- 渲染容器 -->
    <router-view />
  </div>
</template>
<script>
import Header from '@/components/Navigation/Header'
export default{
  components:{
    Header
  }
}
</script>