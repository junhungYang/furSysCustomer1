import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export const store = new Vuex.Store({
  state:{
      provinceId:'',
      provinceName:'',
      cityId:'',
      cityName:'',
      cityList:[]
  },
  mutations: {
      changeProvince(state,payload) {
        state.provinceId = payload[0]
        state.provinceName = payload[1]
        console.log(state.provinceId,state.provinceName)
      },
      changeCity(state,payload) {
        state.cityId = payload[0]
        state.cityName = payload[1]
        console.log(state.cityId,state.cityName)
      },
      cityListInit(state,payload) {
        payload.forEach(item => {
          state.cityList.forEach((item) => {
            state.cityList.push({
              value:item.id,
              label:item.name
            })
          })
        });
      }
  }
});