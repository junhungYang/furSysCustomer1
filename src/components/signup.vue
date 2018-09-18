<template>
    <div class="sign-up">
        <header>请填写资料</header>
        <div class="btn" :class="btnText !== '确认修改' ? 'btn-margin' : ''">
            <button @click="signUp">
                    {{btnText}}
            </button>
        </div>
        <div class="signup-msg">
            <ul>
                <li v-show="btnText !== '确认修改'">
                    <div class="title">
                        <span class="icon"></span>  
                        <span class="desc">姓名</span>
                    </div>
                    <div class="line">
                        <span></span>
                    </div>
                    <div class="cont">
                        <input type="text" placeholder="请输入您的姓名" class="text" v-model="nickName">
                    </div>
                </li>
                <li v-show="btnText !== '确认修改'">
                    <div class="title">
                        <span class="icon"></span>
                        <span class="desc">性别</span>
                    </div>
                    <div class="line">
                        <span></span>
                    </div>
                    <div class="cont">
                        <div class="sex">
                            <div @click="mySex = 1">
                                <img :src="mySex === 1 ? '/static/img/选中@2x.png' : '/static/img/未选中@2x.png'" alt="">
                                <span>先生</span>
                            </div>
                            <div @click="mySex = 2">
                                <img :src="mySex === 2 ? '/static/img/选中@2x.png' : '/static/img/未选中@2x.png'" alt="">
                                <span>女士</span>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="title">
                        <span class="icon"></span>
                        <span class="desc">联系电话</span>
                    </div>
                    <div class="line">
                        <span></span>
                    </div>
                    <div class="cont">
                        <input type="text" placeholder="请输入您的联系电话" class="text" v-model="phoneNum">
                    </div>
                </li>
                <li v-show="btnText !== '确认修改'">
                    <div class="title">
                        <span class="icon"></span>
                        <span class="desc">注册门店</span>
                    </div>
                    <div class="line">
                        <span></span>
                    </div>
                    <div class="cont dealer-select">
                        <dealerSelect></dealerSelect>
                    </div>
                </li>
                <li :class="btnText !== '确认修改' ? 'marginTop' : ''">
                    <div class="title">
                        <span class="icon"></span>
                        <span class="desc">居住地区</span>
                    </div>
                    <div class="line">
                        <span></span>
                    </div>
                    <div class="cont position-wrap">
                        <proviceSelect1></proviceSelect1>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import dealerSelect from '../plugin/dealerSelect'
import { mapState, mapMutations } from 'vuex'
import router from '../router'
import proviceSelect1 from '../plugin/proviceSelect1'
export default {
    data() {
        return {
            mySex: 1,
            btnText: '成为会员',
            nickName: '',
            phoneNum: '',
        }
    },
    computed: {
        ...mapState(['provinceName', 'cityName', 'districtName', 'dealerId'])
    },
    created() {
        console.log(this.$route.params.remark)
        if (this.$route.params.remark) {
            this.btnText = '确认修改'
        }
    },
    methods: {
        ...mapMutations(['userInfoInit']),
        signUp() {
            if(this.btnText === '成为会员') {
                this.register()
            }else if (this.btnText === '确认修改') {
                this.changeInfo()
            }
        },
        register() {
            let str = `name=${this.nickName}&gender=${this.mySex}&mobile=${this.phoneNum}&province=${this.provinceName}&city=${this.cityName}&dealerId=${this.dealerId}`
            axios.get(`${domain.testUrl}user/register?${str}`).then((res) => {
                if (res.data.code === 0) {
                    router.push({path: '/userInfo'})
                } else if (res.data.code === -1) {
                    alert(res.data.msg);
                } 
                else if (res.data.code === 10101) {
                    location.assign('http://qinqing.ydcycloud.com/user/toOauth')
                }
            })
        },
        changeInfo() {
            let str = `mobile=${this.phoneNum}&province=${this.provinceName}&city=${this.cityNam}`
            axios.get(`${domain.testUrl}user/updateUserInfo?${str}`).then((res => {
                if(res.data.code === 0) {
                    router.push({path: '/userInfo'})
                } else if(res.data.code === -1) {
                    alert(res.data.msg)
                } else if(res.data.code === 10101) {
                    location.assign('http://qinqing.ydcycloud.com/user/toOauth')
                }
            }))
        }
    },
    components: {
        dealerSelect,
        proviceSelect1
    }
}
</script>

<style lang="less" scoped>
.sign-up {
  height: 100%;
  position: relative;
  background:#fff;
  header {
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 18px;
    color: #fff;
    background: #c59a68;
  }
  .signup-msg {
      position: absolute;
      left: 0;
      top: 50px;
      right: 0;
    ul {
      margin: 0 13px;
      position: relative;
      li {
        height: 50px;
        border-bottom: 1px solid #e8e8e8;
        display: flex;
        .title,
        .cont,
        .line {
          height: 100%;
          line-height: 50px;
        }
        .title {
          width: 84px;
          span:nth-of-type(1) {
            display: inline-block;
            width: 13px;
            height: 13px;
            background-size: 13px !important;
          }
          span:nth-of-type(2) {
            font-size: 13px;
            color: #353535;
          }
        }
        .line {
          overflow: hidden;
          span {
            height: 13px;
            margin-top: 20px;
            display: inline-block;
            width: 1px;
            background: #e8e8e8;
          }
        }
        .position-wrap {
          display: flex;
          flex: 1;
        }
        .cont {
          flex: 1;
          margin-left: 13px;
          .text {
            border: 0;
            height: ~"calc(100% - 5px)";
            width: 70%;
            outline: none;
            background:transparent;
          }
          .sex {
            height: 100%;
            color: #8e8e8e;
            div {
              height: 100%;
              line-height: 50px;
              display: inline-block;
              position: relative;
              img {
                position: absolute;
                width: 13px;
                height: 13px;
                top: 19px;
              }
              span {
                font-size: 13px;
                display: inline-block;
                margin-left: 18px;
              }
            }
            div:nth-of-type(2) {
              margin-left: 20px;
            }
          }
        }
      }
      li:nth-of-type(1) .title .icon {
        background: url("/static/img/1@2x.png");
      }
      li:nth-of-type(2) .title .icon {
        background: url("/static/img/2@2x.png");
      }
      li:nth-of-type(3) .title .icon {
        background: url("/static/img/3@2x.png");
      }
      li:nth-of-type(4) .title .icon {
        background: url("/static/img/4@2x.png");
      }
      li:nth-of-type(5) .title .icon {
        background: url("/static/img/5@2x.png");
      }
      .marginTop {
          z-index: 99;
          position: absolute;
          top: 150px;
          left:0;
          right:0;
      }
      li:nth-of-type(4) {
          margin-top: 50px;
      }
    }
  }
  .btn {
    height: 34px;
    margin-top: 150px;
    color: #fff;
    button {
      display: block;
      background: linear-gradient(to bottom, #e2b27b, #c59a68); //需更改
      margin: 0 auto;
      outline: none;
      border: 0;
      width: 255px;
      height: 100%;
      text-align: center;
      border-radius: 15px;
       color: #fff;
      div {
        width: 100%;
        height: 100%;
        line-height: 34px;
        
      }
    }
  }
  .btn-margin {
      margin-top: 295px;
  }
}
</style>

