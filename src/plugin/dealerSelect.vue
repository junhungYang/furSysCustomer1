<template>
    <div class="dealer-select">
        <div>
            <input type="text" v-model="value" @click="listShowState = !listShowState">
        </div>
        <div class="scrollWrap" ref="scrollWrap" v-show="listShowState">
            <ul>
                <li v-for="item in 8" @click="value = '你好'">你好</li>
            </ul>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
import Vue from 'vue'
export default {
    data() {
        return {
            listShowState:false,
            dealerList:[],
            value:''
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
    width: 300px;
    height: 50px;
    background:#ccc;
    div:nth-of-type(1) {
        height:100%;
        input {
            padding: 0 13px;
            display: block;
            width:100%;
            height: 100%;
            border: 0;
            outline: none;
            background:transparent;
        }
    }
    .scrollWrap {
        height: 250px;
        background:#ddd;
        padding: 0 13px;
        overflow: hidden;
        ul {
            li {
                height: 40px;
                border-bottom: 1px solid #ddd;
                line-height:40px;
                font-size: 13px;
            }
        }
    }
}
</style>

