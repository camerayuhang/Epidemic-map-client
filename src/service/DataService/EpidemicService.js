/*
 * @Author: camerayuhang
 * @Date: 2022-12-11 14:05:10
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-17 11:37:40
 * @FilePath: /vue3-composition-epidemic-map/src/service/DataService/EpidemicService.js
 * @Description:
 *
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved.
 */
import { requestEpidemic } from '../../http-common';
import authHeader from '../auth-header';
class EpidemicService {
  getEpidemicInfo = async options => {
    return requestEpidemic.get('/infos', {
      params: options,
      headers: authHeader()
    });
  };
  getCityEpidemicInfo = async options => {
    const cityDic = {};
    const { data } = await this.getEpidemicInfo(options);
    // console.log(data);
    data.forEach(row => {
      cityDic[row['city']] = row;
    });
    return cityDic;
  };

  getProvinceEpidemicInfo = async options => {
    const provinceDic = {};
    const { data } = await this.getEpidemicInfo(options);

    data.forEach(row => {
      if (provinceDic[row['province']] == undefined) {
        provinceDic[row['province']] = {};
        provinceDic[row['province']].confirmed = parseInt(row.confirmed);
        provinceDic[row['province']].deaths = parseInt(row.deaths);
        provinceDic[row['province']].recovered = parseInt(row.recovered);
        provinceDic[row['province']].active_cases = parseInt(row.active_cases);
        provinceDic[row['province']].daily_new_cases = parseInt(row.daily_new_cases);
        provinceDic[row['province']].daily_new_deaths = parseInt(row.daily_new_deaths);
        provinceDic[row['province']].daily_new_recovered = parseInt(row.daily_new_recovered);
        provinceDic[row['province']].date = row.date;
        provinceDic[row['province']].daily_new_asymptomatic = parseInt(row.daily_new_asymptomatic);
        provinceDic[row['province']].daily_new_local_cases = parseInt(row.daily_new_local_cases);
        provinceDic[row['province']].daily_new_imported_cases = parseInt(row.daily_new_imported_cases);
      } else {
        provinceDic[row['province']].confirmed += parseInt(row.confirmed);
        provinceDic[row['province']].deaths += parseInt(row.deaths);
        provinceDic[row['province']].recovered += parseInt(row.recovered);
        provinceDic[row['province']].active_cases += parseInt(row.active_cases);
        provinceDic[row['province']].daily_new_cases += parseInt(row.daily_new_cases);
        provinceDic[row['province']].daily_new_deaths += parseInt(row.daily_new_deaths);
        provinceDic[row['province']].daily_new_recovered += parseInt(row.daily_new_recovered);
        provinceDic[row['province']].daily_new_asymptomatic += parseInt(row.daily_new_asymptomatic);
        provinceDic[row['province']].daily_new_local_cases += parseInt(row.daily_new_local_cases);
        provinceDic[row['province']].daily_new_imported_cases += parseInt(row.daily_new_imported_cases);
      }

      return provinceDic;
    });

    return provinceDic;
  };
  // const fujianConfirm = confirm.slice(11900, 14960);
  // const dict = {};
  // fujianConfirm.forEach(element => {
  //   let curDateArr = dict[element['日期']];
  //   if (curDateArr === undefined) {
  //     curDateArr = [];
  //     curDateArr.push(element);
  //     dict[element['日期']] = curDateArr;
  //   } else {
  //     curDateArr.push(element);
  //   }
  // });
  // return dict;
}

export default new EpidemicService();
