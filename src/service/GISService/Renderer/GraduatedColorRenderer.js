import VectorTileLayer from 'ol/layer/VectorTile';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import symbolizationService from '../SymbolizationService';

class GraduatedColorRenderer {
  /**
   *
   * @param {*} renderField
   * @param {VectorTileLayer} layer
   * @param {*} combinedData
   * @param {} valFc
   */
  constructor(renderField, layer, combinedData, joinTable, joinedField) {
    this.colorMap = [
      {
        min: 1,
        max: 9,
        color: '#FAEAD1'
      },
      {
        min: 10,
        max: 99,
        color: '#EAA188'
      },
      {
        min: 100,
        max: 499,
        color: '#D46255'
      },
      {
        min: 500,
        max: 999,
        color: '#BB3836'
      },
      {
        min: 1000,
        max: 10000,
        color: '#772625'
      },
      {
        min: 10001,
        max: 99999,
        color: '#470E11'
      }
    ];
    this.layer = layer;
    this.renderField = renderField;
    this.combinedData = combinedData;
    this.joinTable = joinTable;
    this.joinedField = joinedField;
    this.defaultStyle = this.defaultStyle == undefined ? this.layer.getStyle() : this.defaultStyle;
  }

  render() {
    this.layer.setStyle(this.simpleStyle.bind(this));
  }

  /**
   * shi_code: 3507
   * @param {Feature} feature
   */
  simpleStyle(feature) {
    this.joinTable(this.joinedField, this.combinedData, feature);
    let styles = symbolizationService.getDefaultStyle();
    if (feature.get('attr')) {
      const value = parseInt(feature.get('attr')[this.renderField]);
      let color = this.getColor(value);
      styles = [
        new Style({
          fill: new Fill({
            color: color
          }),
          stroke: new Stroke({
            width: 1,
            color: '#333'
          })
        })
      ];
    }
    return styles;
  }

  getColor(value) {
    let color = this.colorMap[0].color;
    for (let colorObj of this.colorMap) {
      if (value >= colorObj.min && value <= colorObj.max) {
        color = colorObj.color;
      }
    }
    return color;
  }
}

export { GraduatedColorRenderer };
