import { Coordinate } from "ol/coordinate";
import { WKT } from "ol/format";
import { Point } from "ol/geom";
import MultiPolygon from "ol/geom/MultiPolygon";
import Polygon from "ol/geom/Polygon";

export class WktHelper {
  
  public WktAsCoordinates(wktWord, dataProjection, featureProjection) {
    const wkt = new WKT();
    const geometry = wkt.readGeometry(wktWord, {
      dataProjection: dataProjection,
      featureProjection: featureProjection,
    });

    const wktType = this.getWktType(wktWord);
    switch(wktType) {
      case 'point':
      return (geometry as Point).getCoordinates();
      break;
      case 'multipolygon':
      return (geometry as MultiPolygon).getCoordinates();
      break;
      case 'polygon':
      return (geometry as Polygon).getCoordinates();
      break;
    }

  }

getCoordinates(wktWord) {

}

getWktType(wktWord) {
  const wktTypes = ['point', 'multipolygon', 'polygon' ];
  for (const word of wktTypes) {
    if (wktWord.toLowerCase().includes(word)) return word;
  }
  return null;
}

}