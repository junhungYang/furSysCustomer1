<template>
    <div class="provice-select">
        <div @click.stop="proListShowState = true">
            <div class="input">{{province}} / {{city}}</div>
            <img class="icon" src="/static/img/下拉@2x.png">
        </div>
        <div class="scrollWrap" ref="proScrollWrap" v-show="proListShowState">
            <ul>
                <li v-for="item in proviceList" @click.stop="changeProValue(item.label,item.id)">{{item.label}}</li>
            </ul>
        </div>
        <div class="scrollWrap" ref="cityScrollWrap" v-show="cityListShowState">
            <ul>
                <li v-for="item in cityList" @click.stop="changeCityValue(item.label,item.id)">{{item.label}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import {mapState,mapMutations} from 'vuex'
import BScroll from 'better-scroll'
import Vue from 'vue'
export default {
    data() {
        return {
            province:'请选择省',
            city:'请选择市',
            proListShowState: false,
            cityListShowState:false,
            proviceList:[]
        }
    },
    computed: {
        ...mapState(['cityList'])
    },
    created() {
        axios.get(`${domain.testUrl}dealer/findListByLv?lv=1&pid=1`).then((res) => {
        if (res.data.code === 0) {
            let proviceData = res.data.data
            proviceData.forEach((item) => {
              this.proviceList.push({
                  id: item.id,
                  label:item.name
              })
            })
            this.proScrollRefresh()
            this.cityScrollRefresh()
        }else if(res.data.code === -1) {
            alert(res.data.msg)
        }else if(res.data.code === 10101) {
            location.assign('http://qinqing.ydcycloud.com/user/toOauth')
        }
        })
    },
    mounted() {
        this.proScrollList = new BScroll(this.$refs.proScrollWrap,{
            click:true,
            probeType:3
        })
        this.cityScrollList = new BScroll(this.$refs.cityScrollWrap,{
            click:true,
            probeType:3
        })
    },
    methods: {
        ...mapMutations(['cityListInit','dealerListInit','changeCity','changeProvince']),
        changeProValue(label,id) {
            this.province = label
            this.proListShowState = false
            this.cityListShowState = true
            this.getCityData(id)
            this.changeProvince([id,label])
        },
        changeCityValue(label,id) {
            this.city = label
            this.cityListShowState = false
            this.getDealerData(id)
            this.changeCity([id,label])
        },
        getDealerData(id) {
            axios.get(`${domain.testUrl}dealer/getDealerList?cityId=${id}`).then((res) => {
                if(res.data.code === 0) {
                this.dealerListInit(res.data.data)
                }else if(res.data.code === -1) {
                    alert(res.data.msg)
                }else if(res.data.code === 10101) {
                    location.assign('http://qinqing.ydcycloud.com/user/toOauth')
                }
            })
        },
        getCityData(id) {
            axios.get(`${domain.testUrl}dealer/findListByLv?lv=2&pid=${id}`).then((res) => {
                if(res.data.code === 0) {
                    this.cityListInit(res.data.data)
                }else if(res.data.code === -1) {
                    alert(res.data.msg)
                }else if(res.data.code === 10101) {
                    location.assign('http://qinqing.ydcycloud.com/user/toOauth')
                }
            })
        },
        cityScrollRefresh() {
            Vue.nextTick(() => {
                this.cityScrollList.refresh()
            })
        },
        proScrollRefresh() {
            Vue.nextTick(() => {
                this.proScrollList.refresh()
            })
        }
    },
    watch: {
        proListShowState() {
            Vue.nextTick(() => {
                this.proScrollList.refresh()
            })
        },
        cityListShowState() {
            Vue.nextTick(() => {
                this.cityScrollList.refresh()
            })
        }
    }
}
</script>
<style lang="less" scoped>
.provice-select {
    flex: 1;
    div:nth-of-type(1) {
        position: relative;
        .input {
            width: 100%;
            height: 50px;
            color:#353535;
            font-size: 13px;
        }
        .icon {
            position: absolute;
            right: 10px;
            top:50%;
            transform: translateY(-50%)
        }
    }
    .scrollWrap {
        max-height: 250px;
        background:#fff;
        padding: 0 13px;
        overflow: hidden;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.137);
        border-radius: 10px;
        ul {
            li {
                height: 40px;
                border-bottom: 1px solid #ddd;
                line-height:40px;
                font-size: 13px;
                color:#353535;
            }
            li:last-of-type {
                border: 0;
            }
        }
    }
}
</style>

