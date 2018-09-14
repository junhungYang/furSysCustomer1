import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export const store = new Vuex.Store({
         state: {
           provinceId: "",
           provinceName: "",
           cityId: "",
           cityList: [],
           districtList: [],
           dealerList: []
         },
         mutations: {
           changeProvince(state, payload) {
             state.provinceId = payload[0];
             state.provinceName = payload[1];
           },
           changeCity(state, payload) {
             state.cityId = payload;
           },
           cityListInit(state, payload) {
             payload.forEach(item => {
               state.cityList.push({
                 value: item.id,
                 label: item.name
               });
             });
           },
           districtListInit(state, payload) {
             payload.forEach(item => {
               state.districtList.push({
                 value: item.id,
                 label: item.name
               });
             });
           },
           geographicInit(state) {
             state.cityList = []
             state.districtList = []
             state.dealerList = []
           },
           dealerListInit(state,payload) {
            state.dealerList = payload
           }
         }
       });