<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import wx from 'weixin-js-sdk'
import axios from 'axios'
import router from './router'
import dealerSelect from './plugin/dealerSelect'
export default {
  created() {
    // axios.get('/vipSystem/userInfo').then(res => {
    //   if(res.data.code === 0) {
    //     let data = res.data.data
    //     data.hasData ? router.push('userInfo') : router.push('signup')
    //   }
    // })
  },
}
</script>

<style>
@import url("//unpkg.com/element-ui@2.4.6/lib/theme-chalk/index.css");
#app {
  width: 100%;
  height: 100vh;
  max-width: 450px;
  position: fixed;
  left: 50%;
  transform: translateX(-50%)
}
</style>
