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
    countryWithAlldate: undefined
  },
  mutations: {
    setRegion(state, { city, province, country }) {
      state.region.city = city;
      state.region.province = province;
      state.region.country = country;
    },
    setHighLightData(state, payload) {
      state.highLightData = payload.data;
    },
    setCityWithAllDate(state, payload) {
      state.cityWithAllDate = payload.data;
    },
    setProvinceWithAllDate(state, payload) {
      state.provinceWithAllDate = payload.data;
    },
    setCountryWithAlldate(state, payload) {
      state.countryWithAlldate = payload.data;
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
      context.commit('setRegion', { city, province, country });
    }
  }
};
export { data };
