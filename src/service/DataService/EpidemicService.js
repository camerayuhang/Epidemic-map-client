/*
 * @Author: camerayuhang
 * @Date: 2022-12-11 14:05:10
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-11 15:10:52
 * @FilePath: /vue3-composition-epidemic-map/src/service/DataService/EpidemicService.js
 * @Description:
 *
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved.
 */
import { requestEpidemic } from '../../http-common';
class EpidemicService {
  getFujianConfirm = async () => {
    const { data: confirm } = await requestEpidemic.get('./json/20221207.json');
    const fujianConfirm = confirm.slice(11900, 14960);
    const dict = {};
    fujianConfirm.forEach(element => {
      let curDateArr = dict[element['日期']];
      if (curDateArr === undefined) {
        curDateArr = [];
        curDateArr.push(element);
        dict[element['日期']] = curDateArr;
      } else {
        curDateArr.push(element);
      }
    });
    return dict;
  };
}

export default new EpidemicService();
