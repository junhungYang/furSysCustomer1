<template>
    <div class="userInfo">
        <header>
            <div class="brand">
                <div class="logo">
                    <img src="/static/img/brand.png" alt="">
                </div>
                <div class="desc">一个家族的温暖回忆</div>
            </div>
            <div class="proPic">
                <div class="picture">
                    <img :src="userInfoData.head_img_url" alt="">
                </div>
                <div class="level">
                    <span>{{userInfoData.level_id === 1 ? '壹加壹 · 初级会员' : '壹加壹 · 高级会员'}}</span>
                    <img :src="userInfoData.level_id === 1 ? '/static/img/初级@2x.png' :'/static/img/高级@2x.png'" alt="">
                </div>
            </div>
        </header>
        <div class="game" v-show="userLevel === 2 ? true :false" @click="jumpToGame">
            <span>高级会员福利: </span>
            <span>(第20180915 - 20181015期)玩游戏赢代金券</span>
            <img src="/static/img/更改@2x.png" alt="">
        </div>
        <div class="my-msg">
            <div class="msg-wrap">
                <div class="desc">
                    <ul>
                        <li>
                            <span>会员名称</span>
                            <span>
                                 {{userInfoData.nickname}}
                            </span>
                        </li>
                        <li>
                            <span>联系电话</span>
                            <span>
                                {{userInfoData.mobile}}
                            </span>
                        </li>
                        <li>
                            <span>居住地区</span>
                            <span>
                                {{userInfoData.province}}{{userInfoData.city}}
                            </span>
                        </li>
                        <li>
                            <span>会员编号</span>
                            <span>
                                {{userInfoData.member_code}}
                            </span>
                        </li>
                    </ul>
                    <div class="desc-footer" @click="routerToSignUp">
                        <span>
                            点击修改个人资料 >
                        </span>
                    </div>
                </div>
                <div class="QR-code">
                    <img :src="userInfoData.qr_code_url" alt="">
                </div>
            </div>
            <div class="footer">出示上面二维码于店员可进行下单</div>
        </div>
        <div class="signle-record">
            <div class="title">下单记录</div>
            <div class="scrollWrap" ref="scrollWrap">
                <ul>
                    <li v-for="item in historyList">
                        <div class="shop-time">
                            <div class="shop">
                                所选门店: <span>{{item.dealer_name}}</span>
                            </div>
                            <div class="when">
                                <span class="date">{{item.create_time}}</span>
                            </div>
                        </div>
                        <div class="series">
                            购买系列: <span>{{item.series_name}}</span>
                        </div>
                    </li>
                </ul>
                <div class="loading" v-show="loadingFlag">
                    <v-loadingAnimate></v-loadingAnimate>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import Vue from 'vue'
import loadingAnimate from '../plugin/loadingAnimate'
import router from '../router/index'
import { mapState, mapMutations } from 'vuex'
export default {
    data() {
        return {
            historyList: [],
            loadingFlag: false,
            userLevel: '',
            pageIndex:1,
            loadingFlag:false
        }
    },
    computed: {
        ...mapState(['userInfoData'])
    },
    mounted() {
        this.scrollList = new BScroll(this.$refs.scrollWrap, {
            click: true,
            probeType: 3,
            pullDownRefresh: {
                threshold: 20,
                stop: 0
            },
            pullUpLoad:true
        })
        this.scrollEventInit()

    },
    created() {
        this.getUserInfo()
        this.getUserOrderList(1)
    },
    methods: {
        ...mapMutations(['userInfoInit']),
        //vip等级为2的用户可参与游戏
        jumpToGame() {
            location.assign('https://hd.faisco.cn/14539784/LlDzcNHl_09FsbTPxatFNw/load.html?style=21')
        },
        routerToSignUp() {
            router.push({ name: 'signUp', params: { remark: '修改资料' } })
        },
        //获取用户信息并初始化在store中的用户信息
        getUserInfo() {
            axios.post(`${domain.testUrl}user/getUserInfo`).then((res) => {
                if (res.data.code === 0) {
                    if (res.data.data.level_id === 2) {
                        this.userLevel = 2
                    }
                    this.userInfoInit(res.data.data)
                }else if(res.data.code === -1) {
                    alert(res.data.msg)
                }else if(res.data.code === 10101) {
                    location.assign('http://qinqing.ydcycloud.com/user/toOauth')
                }
            })
        },
        scrollEventInit() {
            this.scrollList.on('pullingDown',() => {
                this.pageIndex--
                this.pageIndex > 0 ? this.getUserOrderList() :　'';
                this.scrollList.finishPullDown()
            })
            this.scrollList.on('pullingUp',pos => {
                this.pageIndex ++
                this.getUserOrderList()
                this.scrollList.finishPullUp()
            })
        },
        //瀑布流获取用户购买记录
        getUserOrderList(num) {
            console.log(this.pageIndex)
            this.loadingFlag = true
            let str = `pageNumber=${this.pageIndex}&pageSize=10`
            // /api/user/getUserOrderList
            // ${domain.testUrl}user/getUserOrderList?${str}
            axios.get(`${domain.testUrl}user/getUserOrderList?${str}`).then(res => {
                if(res.data.code === 0) {
                        this.historyList = res.data.data.list
                        this.scrollRefresh()
                    }else if(res.data.code === -1) {
                        alert(res.data.msg)
                    }else if(res.data.code === 10101) {
                        location.assign('http://qinqing.ydcycloud.com/user/toOauth')
                    }
            })
            this.timer = setTimeout(() => {
                this.loadingFlag = false
            }, 1500);
        },
        scrollRefresh() {
            Vue.nextTick(() => {
                this.scrollList.refresh()
            })
        }
    },
    components: {
        'v-loadingAnimate':loadingAnimate
    }
}
</script>

<style lang="less" scoped>
.userInfo {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
  header {
    height: 150px;
    width: 100%;
    background: rgb(0, 0, 0);
    display: flex;
    .brand {
      flex: 1;
      .logo {
        margin-left: 44px;
        margin-top: 27px;
        img {
          height: 67px;
        }
      }
      .desc {
        color: #d2b9a0;
        font-size: 20px;
        transform: scale(0.5);
        margin-left: 44px;
        margin-top: 10px;
        transform-origin: left;
      }
      @media screen and (max-width:340px) {
          .desc {
              position: absolute;
              margin-left: 44px;
          }
      }
    }
    .proPic {
      width:130px !important;
      margin-top: 20px;
      .picture {
        margin-left: 10px;
        width: 77px;
        height: 77px;
        background: url("/static/img/circleBg.png");
        background-size: cover;
        border-radius: 50%;
        overflow: hidden;
        padding: 3px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .level {
        margin-top: 10px;
        span {
          color: #fff;
          font-size: 13px;
        }
        img {
          width: 13px;
          height: 11px;
        }
      }
    }
  }
  .game {
    height: 40px;
    border-bottom: 1px solid #ddd;
    font-size: 13px;
    line-height: 40px;
    color: #353535;
    background: #fff;
    padding-left: 13px;
    span:nth-of-type(2) {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    span:nth-of-type(1) {
      color: #c59a68;
    }
  }
  .my-msg {
    background: #fff;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    margin-bottom: 10px;
    box-shadow: 0 0 5px #ddd;
    height: 200px;
    .msg-wrap {
      display: flex;
      margin-bottom: 10px;
      .desc {
        flex: 1;
        ul {
          margin: 18px 18px 0 18px;
          li {
            height: 31px;
            line-height: 31px;
            font-size: 13px;
            display: flex;
            span:nth-of-type(1) {
              color: #e2ccb3;
            }
            span:nth-of-type(2) {
              flex: 1;
              text-align: right;
              color: #676767;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
          @media screen  and (max-width:340px){
              li {
                  span:nth-of-type(2) {
                      width: 110px;
                  }
              }
          }
        }
        .desc-footer {
          text-align: center;
          color: #b5b5b5;
          line-height: 10px;
          margin-top: 9px;
          span {
            display: block;
            font-size: 20px;
            transform: scale(0.5);
          }
        }
      }
      .QR-code {
        width: 147px;
        height: 147px;
        border: 2px solid #d2b9a0;
        margin-right: 13px;
        margin-top: 13px;
        img {
          width: 100%;
        }
      }
    }
    .footer {
      // margin-top:10px;
      text-align: center;
      font-size: 20px;
      transform: scale(0.5);
      color: #e2ccb3;
      margin-bottom: 5px;
    }
  }
  .signle-record {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .title {
      height: 32px;
      background: #c59a68;
      text-align: center;
      line-height: 32px;
      font-size: 15px;
      color: #fff;
    }
    .scrollWrap {
      overflow: hidden;
      flex: 1;
      position: relative;
      ul {
        background: #fff;
        li {
          height: 60px;
          border-bottom: 1px solid #e8e8e8;
          display: flex;
          padding: 0 13px;
          .shop-time {
            margin-top: 12px;
            flex: 1;
            font-size: 13px;
            .shop {
              color: #353535;
            }
            .when {
              margin-top: 13px;
              color: #8e8e8e;
            }
          }
          .series {
            margin-top: 12px;
            width: 150px;
            font-size: 13px;
            text-align: right;
            color: #353535;
            span {
              color: #c59a68;
            }
          }
        }
        .loading {
          height: 40px;
          text-align: center;
          line-height: 40px;
          color: #ccc;
          font-size: 12px;
        }
      }
        .loading {
            position: absolute;
            top:0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
  }
}
</style>

