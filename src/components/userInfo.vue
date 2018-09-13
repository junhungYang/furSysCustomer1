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
            <div class="footer">出示上面二维码于电源可进行下单</div>
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
                    <div class="loading" v-show="loadingFlag">{{loadingState}}</div>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import Vue from 'vue'
import waterfull from '../plugin/waterfullApi'
import router from '../router/index'
export default {
    data() {
        return {
            userInfoData: {},
            historyList: [],
            loadingFlag: false
        }
    },
    mounted() {
        this.scrollList = new BScroll(this.$refs.scrollWrap, {
            click: true,
            probeType: 3
        })
        waterfull.scrollGetData(this, 'scrollWrap', 'scrollList', '/api/user/getUserOrderList')
    },
    created() {
        this.waterfullInit()
        this.getUserInfo()
        this.getUserOrderList(1)
    },
    methods: {
        routerToSignUp() {
            router.push({name:'signUp',params: { remark: '修改资料' }})
        },
        getUserInfo() {
            axios.post('/api/user/getUserInfo').then((res) => {
                if (res.data.code === 0) {
                    this.userInfoData = res.data.data
                }
            })
        },
        getUserOrderList(num) {
            axios.post('/api/user/getUserOrderList', {
                pageNumber: num,
                pageSize: 10
            }).then((res) => {
                this.historyList = res.data.data.list
                console.log(this.historyList)
                this.scrollRefresh()
            })
        },
        waterfullInit() {
            waterfull.propInit(this)
        },
        scrollRefresh() {
            Vue.nextTick(() => {
                this.scrollList.refresh()
            })
        }
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
    }
    .proPic {
      // width:130px;
      margin-top: 20px;
      margin-right: 13px;
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
    }
  }
}
</style>

