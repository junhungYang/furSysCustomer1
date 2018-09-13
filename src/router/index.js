import Vue from 'vue'
import Router from 'vue-router'
import signUp from "@/components/signUp"
import userInfo from "@/components/userInfo"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      component: userInfo
    },
    {
      path: "/userInfo",
      component: userInfo
    },
    {
      path: "/signUp",
      name:'signUp',
      component: signUp
    }
  ]
});
