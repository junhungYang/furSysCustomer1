<template>
    <div class="sign-up">
        <header>请填写资料</header>
        <div class="signup-msg">
            <ul>
                <li>
                    <div class="title">
                        <span class="icon"></span>  
                        <span class="desc">姓氏</span>
                    </div>
                    <div class="line">
                        <span></span>
                    </div>
                    <div class="cont">
                        <input type="text" placeholder="请输入您的姓氏" class="text">
                    </div>
                </li>
                <li>
                    <div class="title">
                        <span class="icon"></span>
                        <span class="desc">性别</span>
                    </div>
                    <div class="line">
                        <span></span>
                    </div>
                    <div class="cont">
                        <div class="sex">
                            <div @click="mySex = 'male'">
                                <img :src="mySex === 'male' ? '/static/img/选中@2x.png' : '/static/img/未选中@2x.png'" alt="">
                                <span>男士</span>
                            </div>
                            <div @click="mySex = 'female'">
                                <img :src="mySex === 'female' ? '/static/img/选中@2x.png' : '/static/img/未选中@2x.png'" alt="">
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
                        <input type="text" placeholder="请输入您的联系电话" class="text">
                    </div>
                </li>
                <li>
                    <div class="title">
                        <span class="icon"></span>
                        <span class="desc">居住地区</span>
                    </div>
                    <div class="line">
                        <span></span>
                    </div>
                    <div class="cont">
                        <!-- <v-distpicker  class="wrapper">
                            <select class="sheng"></select>
                            <select></select>
                            <select></select>
                        </v-distpicker> -->
                    </div>
                </li>
                <li>
                    <div class="title">
                        <span class="icon"></span>
                        <span class="desc">注册门店</span>
                    </div>
                    <div class="line">
                        <span></span>
                    </div>
                    <div class="cont">
                        <input type="text" placeholder="请选择您的注册门店">
                    </div>
                </li>
            </ul>
        </div>
        <div class="btn">
            <button>
                <router-link tag="div" to="userInfo">成为会员</router-link>
            </button>
        </div>
    </div>
</template>
<script>
import VDistpicker from 'v-distpicker'
export default {
    data() {
        return {
            mySex: 'male',
            placeholders: {
                province: '------- 省 --------',
                city: '--- 市 ---',
                area: '--- 区 ---',
            }
        }
    },
    components: {
        'v-distpicker': VDistpicker
    }
}
</script>

<style lang="less" scoped>
.sign-up {
  height: 100%;
  header {
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 18px;
    color: #fff;
    background: #c59a68;
  }
  .signup-msg {
    ul {
      margin: 0 13px;
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
        .cont {
          flex: 1;
          margin-left: 13px;
          .text {
            border: 0;
            height: ~"calc(100% - 5px)";
            width: 70%;
            outline: none;
          }
          .sex {
            height: 100%;
            color:#8e8e8e;
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
    }
  }
  .btn {
    height: 34px;
    margin-top: 34px;
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
      div {
          width: 100%;
          height: 100%;
          line-height: 34px;
          color:#fff;
      }
    }
  }
}
// sign-up.el-cascader{
//    background: red;
// }
.distpicker-address-wrapper {
  width: 100px !important;
  // .sheng {
  //     width: 100px !important;
  // }
  overflow: hidden;
  select:nth-of-type(1) {
    display: inline !important;
  }
}
</style>

