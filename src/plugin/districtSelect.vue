<template>
  <el-select v-model="value" placeholder="请选择" size="mini" filterable>
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
  </el-select>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      options: [],
      value: ''
    }
  },
  created() {
    axios.get('/api/dealer/findListByLv2', {
      lv: 3,
      pid: 2
    }).then((res) => {
      if (res.data.code === 0) {
        console.log(this.options)
        let district = res.data.data
        district.forEach((item) => {
          this.options.push({
            value:item.id,
            label:item.name
          })
        })
        console.log(this.options)
      }
    })
  }

}
</script>
<style>
.el-input--suffix .el-input__inner {
  padding-left: 2px;
  width: 80px;
}
</style>

