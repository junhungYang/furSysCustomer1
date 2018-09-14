<template>
    <div class="dealer-select">
        <div>
            <input type="text" v-model="value" @click.stop="listShowState = true">
            <img class="icon" src="/static/img/下拉@2x.png">
        </div>
        <div class="scrollWrap" ref="scrollWrap" v-show="listShowState">
            <ul>
                <li v-for="item in dealerList" @click.stop="changeValue(item.label)">{{item.label}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
import Vue from 'vue'
import {mapState,mapMutations} from 'vuex'
export default {
    data() {
        return {
            listShowState:false,
            value:''
        }
    },
    computed: {
        ...mapState(['dealerList'])
    },
    methods: {
        ...mapMutations(['changeDealer']),
        changeValue(value) {
            this.listShowState = false
            this.value = value
        }
    },
    mounted() {
        this.scrollList = new BScroll(this.$refs.scrollWrap,{
            click:true,
            probeType:3
        })
    },
    watch: {
        value() {
            Vue.nextTick(() => {
                this.scrollList.refresh()
            })
            let id = ''
            this.dealerList.forEach(obj => {
                if(obj.label === this.value) {
                    id = obj.value
                    return
                }
            });
            this.changeDealer(id)
        },
        listShowState() {
            Vue.nextTick(() => {
                this.scrollList.refresh()
            })
        }
    }
    

}
</script>

<style lang="less">
.dealer-select {
    flex:1;
    height: 100%;
    div:nth-of-type(1) {
        height:100%;
        position: relative;
        input {
            padding: 0 13px;
            display: block;
            width:100%;
            height: 100%;
            border: 0;
            outline: none;
            background:transparent;
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

