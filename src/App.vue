<template>
  <div id="app">
    <Footer />
    <!-- 渲染容器 -->
    <router-view />

  </div>
</template>

<script>
import Footer from '@/components/Navigation/Footer'
  export default{
    // 注册组件
    components:{ 
      Footer
    } 
  }
</script>

<style lang="scss">

</style>
