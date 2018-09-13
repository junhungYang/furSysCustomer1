<template>
  <el-select v-model="value" placeholder="请选择" size="mini">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
import axios from 'axios'
import {mapState,mapMutations} from 'vuex'
  export default {
    data() {
      return {
        options: [],
        value: ''
      }
    },
    created() {
        //异常请求回来的是国家信息
        axios.get(`${domain.testUrl}dealer/findListByLv`, {
        lv: 1,
        pid: 1
        }).then((res) => {
        if (res.data.code === 0) {
            let district = res.data.data
            district.forEach((item) => {
              this.options.push({
                  value: `${item.id}-${item.name}`,
                  label:item.name
              })
            })
        }
        })
    },
    methods: {
        ...mapMutations(['changeProvince','cityListInit']),
        getCityData(cityId) {
          axios.get(`${domain.testUrl}dealer/findListByLv`,{
            lv:2,
            pid:cityId
          }).then((res) => {
            this.cityListInit(res.data.data)
          })
        }
    },
    watch: {
        value() {
            let arr = this.value.split('-')
            this.changeProvince(arr)
            this.getCityData(arr[0])
        }
    }
  }
</script>