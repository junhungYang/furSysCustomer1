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
Mock.mock("/api/user/getUserOrderList", {
  code: 0,
  codeMsg: "",
    data: data.getUserOrderList
});
Mock.mock("/api/user/updateUserInfo", {
  code: 0,
  codeMsg: "",
  data: data.updateUserInfo
});
Mock.mock("/api/dealer/findListByLv", {
  code: 0,
  codeMsg: "",
    data: data.findListByLv
});
Mock.mock("/api/dealer/findListByLv1", {
  code: 0,
  codeMsg: "",
    data: data.findListByLv1
});
Mock.mock("/api/dealer/findListByLv2", {
  code: 0,
  codeMsg: "",
    data: data.findListByLv2
});