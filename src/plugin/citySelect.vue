<template>
  <el-select v-model="value" placeholder="请选择" size="mini">
    <el-option
      v-for="item in cityList"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      // options: [],
      value: ''
    }
  },
  computed: {
    ...mapState(['cityList'])
  },
  methods: {
    ...mapMutations(['changeCity','districtListInit','dealerListInit']),
    getDistrictData(cityId) {
      axios.get(`${domain.testUrl}dealer/findListByLv?lv=3&pid=${cityId}`).then((res) => {
        this.districtListInit(res.data.data)
      })
    },
    getDealerData(cityId) {
      axios.get(`${domain.testUrl}dealer/getDealerList?cityId=99`).then((res) => {
        if(res.data.code === 0) {
          this.dealerListInit(res.data.data)
        }
      })
    }
  },
  watch: {
    value() {
      this.changeCity(this.value)
      this.getDistrictData(this.value)
      this.getDealerData(this.value)
    }
  }
}
</script>