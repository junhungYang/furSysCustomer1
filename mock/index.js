import Mock from 'mockjs'
import data from '../data.json'

Mock.mock('/vipSystem/userInfo',{
    code:0,
    codeMsg:'success',
    data:data.userInfo
})