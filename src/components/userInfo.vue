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
                    <img src="/static/img/10.jpg" alt="">
                </div>
                <div class="level">
                    <span>壹加壹 · 高级会员</span>
                    <img src="/static/img/高级@2x.png" alt="">
                </div>
            </div>
        </header>
        <div class="my-msg">
            <div class="msg-wrap">
                <div class="desc">
                    <ul>
                        <li v-for="item in userInfo">
                            <span>{{item.title}}</span>
                            <span>{{item.cont}}</span>
                        </li>
                    </ul>
                    <div class="desc-footer">
                        <span>点击修改个人资料 ></span>
                    </div>
                </div>
                <div class="QR-code">
                    <img src="/static/img/QRcode.jpg" alt="">
                </div>
            </div>
            <div class="footer">出示上面二维码于电源可进行下单</div>
        </div>
        <div class="signle-record">
            <div class="title">下单记录</div>
            <ul>
                <li v-for="item in record">
                    <div class="shop-time">
                        <div class="shop">
                            所选门店: <span>{{item.shop}}</span>
                        </div>
                        <div class="when">
                            <span class="date">{{item.date}}</span>
                            <span class="time">{{item.time}}</span>
                        </div>
                    </div>
                    <div class="series">
                        购买系列: <span>{{item.goods}}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            userInfo: [{
                title:'会员名称',
                cont:'唐先生'
            },{
                title:'联系电话',
                cont:'15218917058'
            },{
                title:'居住地区',
                cont:'广东佛山'
            },{
                title:'会员编号',
                cont:'C000001'
            },],
            record:[{
                shop:'GDFS',
                date:'2018-07-11',
                time:'13:25:04',
                goods:'听风细雨'
            },{
                shop:'GDFS',
                date:'2018-07-11',
                time:'13:25:04',
                goods:'听风细雨'
            },{
                shop:'GDFS',
                date:'2018-07-11',
                time:'13:25:04',
                goods:'听风细雨'
            },{
                shop:'GDFS',
                date:'2018-07-11',
                time:'13:25:04',
                goods:'听风细雨'
            },{
                shop:'GDFS',
                date:'2018-07-11',
                time:'13:25:04',
                goods:'听风细雨'
            },{
                shop:'GDFS',
                date:'2018-07-11',
                time:'13:25:04',
                goods:'听风细雨'
            },]
        }
    }
}
</script>

<style lang="less" scoped>
.userInfo {
  display: flex;
  flex-direction: column;
  background:#f5f5f5;
  header {
    height: 150px;
    background:rgb(0, 0, 0);
    display:flex;
    .brand {
        flex:1;
        .logo {
            margin-left:44px;
            margin-top:27px;
            img {
                height:67px;
            }
        }
        .desc {
            color:#d2b9a0;
            font-size:20px;
            transform: scale(0.5);
            margin-left:44px;
            margin-top:10px;
            transform-origin: left;
        }
    }
    .proPic {
        // width:130px;
        margin-top:20px;
        margin-right:13px;
        .picture {
            margin-left:10px;
            width:77px;
            height:77px;
            background:url('/static/img/circleBg.png');
            background-size: cover;
            border-radius: 50%;
            overflow: hidden;
            padding:3px;
            img {
                width:100%;
                height:100%;
                border-radius: 50%;
            }
        }
        .level {
            margin-top:10px;
            span {
                color:#fff;
                font-size: 13px;
            }
            img {
                width:13px;
                height:11px;
            }
        }
    }
  }
  .my-msg {
      background:#fff;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    margin-bottom: 10px;
    box-shadow: 0 0 5px #ddd;
    .msg-wrap {
      display: flex;
      margin-bottom: 10px;
      .desc {
        flex: 1;
        ul {
            margin:18px 18px 0 18px;
            li {
                height:31px;
                line-height:31px;
                font-size: 13px;
                display: flex;
                span:nth-of-type(1) {
                    color:#e2ccb3;
                }
                span:nth-of-type(2) {
                    flex:1;
                    text-align: right;
                    color:#676767;
                }
            }
        }
        .desc-footer {
          text-align: center;
          color:#b5b5b5;
          line-height: 10px;
          margin-top:9px;
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
        margin-right:13px;
        margin-top:13px;
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
        color:#e2ccb3;
        margin-bottom: 5px;
    }
  }
  .signle-record {
    flex: 1;
    overflow: hidden;
    .title {
      height: 32px;
      background: #c59a68;
      text-align: center;
      line-height: 32px;
      font-size:15px;
      color:#fff;
    }
    ul {
      li {
        height: 60px;
        border-bottom: 1px solid #e8e8e8;
        display: flex;
        padding:0 13px;
        .shop-time {
            margin-top: 12px;
            flex:1;
            font-size: 13px;
            .shop {
                color:#353535;
            }
            .when {
                margin-top: 13px;
                color:#8e8e8e;
            }
        }
        .series {
            margin-top: 12px;
            width: 150px;
            font-size: 13px;
            text-align: right;
            color:#353535;
            span {
                color: #c59a68;
            }
        }
      }
    }
  }
}
</style>

