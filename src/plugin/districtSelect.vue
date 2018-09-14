<template>
  <el-select v-model="value" placeholder="请选择" size="mini" filterable>
    <el-option
      v-for="item in districtList"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
  </el-select>
</template>

<script>
import axios from 'axios'
import {mapState,mapMutations} from 'vuex'
export default {
  data() {
    return {
      // options: [],
      value: ''
    }
  },
  computed:{
    ...mapState(['districtList'])
  },
  methods: {
    ...mapMutations(['changeDistric'])
  },
  watch: {
    value() {
      let arr = this.value.split('-')
      this.changeDistric(arr)
    },
    districtList() {
      console.log(this.districtList)
    }
  }
}
</script>
<style>
.el-input--suffix .el-input__inner {
  padding-left: 2px;
  width: 80px;
}
</style>

