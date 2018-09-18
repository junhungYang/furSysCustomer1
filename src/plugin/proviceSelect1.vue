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
            this.proScrollInit()
        }
        })
    },
    mounted() {
        this.scrollList = new BScroll(this.$refs.proScrollWrap,{
            click:true,
            probeType:3
        })
    },
    methods: {
        ...mapMutations(['cityListInit']),
        changeProValue(label,id) {
            this.province = label
            this.proListShowState = false
            this.cityListShowState = true
            this.getCityData(id)
        },
        changeCityValue(label,id) {
            this.city = label
            this.cityListShowState = false
        },
        getCityData(id) {
            console.log(id)
            axios.get(`${domain.testUrl}dealer/findListByLv?lv=2&pid=${id}`).then((res) => {
                if(res.data.code === 0) {
                    this.cityListInit(res.data.data)
                }
            })
        },
        proScrollInit() {
            
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
        background:red;
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

