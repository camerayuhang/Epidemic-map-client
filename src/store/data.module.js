/*
 * @Author: camerayuhang
 * @Date: 2022-12-20 21:40:23
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-22 21:00:42
 * @FilePath: /vue3-composition-epidemic-map/src/store/data.module.js
 * @Description:
 *
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved.
 */
import epidemicService from '../service/DataService/EpidemicService.js';
const data = {
  namespaced: true,
  state: {
    highLightData: undefined,
    region: {
      city: undefined,
      province: undefined,
      country: undefined
    },
    cityWithAllDate: undefined,
    provinceWithAllDate: undefined,
    countryWithAlldate: undefined,
    allCitiesData: undefined,
    labels: {
      provinceArr: undefined,
      cityArr: undefined,
      dateArr: undefined,
      fieldArr: undefined
    },
    options: {
      cityArr: undefined
    }
  },
  // getters: {
  //   optionsCityLabels(state) {
  //     // const arr = [];
  //     // state.labels.cityArr.forEach(element => {
  //     //   arr.push({
  //     //     label: element,
  //     //     value: label
  //     //   });
  //     // });
  //     return state.labels.cityArr;
  //   }
  // },
  mutations: {
    setAllCitiesData(state, data) {
      state.allCitiesData = data;
    },
    setRegion(state, { city, province, country }) {
      state.region.city = city;
      state.region.province = province;
      state.region.country = country;
    },
    setHighLightData(state, payload) {
      state.highLightData = payload.data;
      state.region.city = payload.data.city;
    },
    setCityWithAllDate(state, payload) {
      state.cityWithAllDate = payload.data;
      state.region.city = payload.data[0].city;
    },
    setProvinceWithAllDate(state, payload) {
      state.provinceWithAllDate = payload.data;
      state.region.province = payload.data[0].province;
    },
    setCountryWithAlldate(state, payload) {
      state.countryWithAlldate = payload.data;
      state.region.country = payload.data[0].country;
    },
    setLabels(state, { cityArr, provinceArr, fieldArr, dateArr }) {
      state.labels.cityArr = cityArr;
      state.labels.provinceArr = provinceArr;
      state.labels.fieldArr = fieldArr;
      state.labels.dateArr = dateArr;
    },
    setOptions(state, { optionsArr }) {
      state.options.cityArr = optionsArr;
    }
  },
  actions: {
    async updateData(context, payload) {
      const featureData = payload.data;
      const city = payload.data.city;
      const province = payload.data.province;
      const country = payload.data.country;
      if (context.state.region.city !== city) {
        const { data } = await epidemicService.getEpidemicInfo({ city });
        context.commit('setHighLightData', { data: featureData });
        context.commit('setCityWithAllDate', { data });
      }
      if (context.state.region.province !== province) {
        const { data } = await epidemicService.getEpidemicWithAllDate(province);
        context.commit('setProvinceWithAllDate', { data });
      }
      if (context.state.region.country !== country) {
        const { data } = await epidemicService.getEpidemicWithAllDate();
        context.commit('setCountryWithAlldate', { data });
      }
    },
    async initLabels({ commit }) {
      const { data } = await epidemicService.getEpidemicInfo({ city: '北京' });
      const dateArr = [];
      let fieldArr = null;
      const cityArr = [];
      const optionsArr = [];
      const provinceArr = [];
      data.forEach(row => {
        dateArr.push(row['date']);
      });
      fieldArr = Object.keys(data[0]);
      const { data: result } = await epidemicService.getEpidemicInfo({ date: '2022-12-06' });
      commit('setAllCitiesData', result);
      result.forEach(row => {
        optionsArr.push({
          label: row['city'],
          value: row['id']
        });
        cityArr.push(row['city']);
        if (!provinceArr.includes(row['province'])) {
          provinceArr.push(row['province']);
        }
      });
      provinceArr.push('全国');
      commit('setLabels', { dateArr, cityArr, provinceArr, fieldArr });
      commit('setOptions', { optionsArr });
    }
  }
};
export { data };
