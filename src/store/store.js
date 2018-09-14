import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export const store = new Vuex.Store({
         state: {
           provinceId: "",
           provinceName: "",
           cityName:"",
           cityId: "",
           districtId:"",
           districtName: "",
           dealerName:"",
           cityList: [],
           districtList: [],
           dealerList: [],
           nickName:'',
           mySex:'',
           phoneNum:'',
           userInfoData:{}
         },
         mutations: {
           changeProvince(state, payload) {
             state.provinceId = payload[0];
             state.provinceName = payload[1];
           },
           changeCity(state, payload) {
             state.cityId = payload[0];
             state.cityName = payload[1];
           },
           changeDistric(state,payload) {
             state.districtId = payload[0];
             state.districtName = payload[1];
           },
           changeDealer(state,payload) {
             state.dealerId = payload
           },
           cityListInit(state, payload) {
             payload.forEach(item => {
               state.cityList.push({
                 value: `${item.id}-${item.name}`,
                 label: item.name
               });
             });
           },
           districtListInit(state, payload) {
             payload.forEach(item => {
               state.districtList.push({
                 value: `${item.id}-${item.name}`,
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
             payload.forEach(item => {
               state.dealerList.push({
                 value: item.id,
                 label: item.name
               });
             });
           },
           userInfoInit(state,payload) {
             state.userInfoData = payload
           }
         }
       });