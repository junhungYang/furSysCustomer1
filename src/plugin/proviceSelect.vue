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
        axios.get(`${domain.testUrl}dealer/findListByLv?lv=1&pid=1`).then((res) => {
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
        ...mapMutations(['changeProvince','cityListInit','geographicInit']),
        getCityData(provicId) {
          axios.get(`${domain.testUrl}dealer/findListByLv?lv=2&pid=${provicId}`).then((res) => {
            this.cityListInit(res.data.data)
          })
        }
    },
    watch: {
        value() {
          this.geographicInit()
            let arr = this.value.split('-')
            this.changeProvince(arr)
            this.getCityData(arr[0])
        }
    }
  }
</script>