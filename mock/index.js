import Mock from 'mockjs'
import data from '../data.json'
Mock.mock('/vipSystem/userInfo',{
    code:0,
    codeMsg:'success',
    data:data.userInfo
})
Mock.mock("/api/user/getUserInfo", {
  code: 0,
  codeMsg: "",
  data: data.hasUserInfo
});