/*
 * @Author: camerayuhang
 * @Date: 2022-12-10 16:48:40
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-10 16:48:43
 * @FilePath: /vue3-composition-epidemic-map/src/service/Utils/baseutils.js
 * @Description:
 *
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved.
 */
// 文件转换成base64
const fileToBase64 = file => {
  const promise = new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = err => {
      reject(err);
    };
  });
  return promise;
};
const clearEmptyValue = form => {
  const newForm = {};
  for (const key in form) {
    if (form[key]) {
      newForm[key] = form[key];
    }
  }
  return newForm;
};
const diffFormData = (form, formClone) => {
  const diffForm = {};
  for (const key in form) {
    if (form[key] !== formClone[key]) {
      diffForm[key] = form[key];
    }
  }
  return diffForm;
};
/**
 *
 * @param {Array} arr
 * @param {Number} indexBefore
 * @param {Number} indexAfter
 * @returns
 */
const reOrderArr = (arr, indexBefore, indexAfter) => {
  const step = indexBefore - indexAfter;
  if (step === 0) return arr;
  if (step > 0) {
    // 先删除
    const delArr = arr.splice(indexAfter, step);
    // 再添加
    arr.splice(indexAfter + 1, 0, ...delArr);
  } else {
    const delArr = arr.splice(indexBefore + 1, Math.abs(step));
    arr.splice(indexBefore, 0, ...delArr);
  }
};
const getIndexof = (arr, obj) => {
  let objIndex = -1;
  arr.some((item, index) => {
    if (item === obj) {
      objIndex = index;
      return true;
    } else {
      return false;
    }
  });
  return objIndex;
};

export { fileToBase64, clearEmptyValue, diffFormData, reOrderArr, getIndexof };
