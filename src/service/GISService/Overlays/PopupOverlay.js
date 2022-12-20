/*
 * @Author: camerayuhang
 * @Date: 2022-12-20 16:06:44
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-20 18:48:04
 * @FilePath: /vue3-composition-epidemic-map/src/service/GISService/Overlays/PopUpOverlay.js
 * @Description:
 *
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved.
 */
import { Overlay } from 'ol';

class PopupOverlay {
  constructor(map, element) {
    this.map = map;
    this.element = element;
  }

  initOverlay() {
    const popup = new Overlay({
      element: this.element,
      autoPan: {
        // true已经被弃用，现在直接写对象
        animation: {
          duration: 250
        },
        margin: 30
      }
    });
    this.map.addOverlay(popup);
    return popup;
  }
}

export { PopupOverlay };
