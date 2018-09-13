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
        axios.get('/api/dealer/findListByLv', {
        lv: 0,
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
        ...mapMutations(['changeProvince'])
    },
    watch: {
        value() {
            let arr = this.value.split('-')
            this.changeProvince(arr)
        }
    }
  }
</script>