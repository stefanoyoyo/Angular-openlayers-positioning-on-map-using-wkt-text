import { Component, OnInit, AfterViewInit } from "@angular/core";

import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { Draw, Modify, Snap } from "ol/interaction";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import Overlay from "ol/Overlay";
import { WKT } from "ol/format";
import Point from "ol/geom/Point";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, AfterViewInit {

  map: Map;

  ngOnInit() {
    var raster = new TileLayer({
      source: new OSM()
    });

    var source = new VectorSource();
    var vector = new VectorLayer({
      source: source,
      style: new Style({
        fill: new Fill({
          color: "rgba(255, 255, 255, 0.2)"
        }),
        stroke: new Stroke({
          color: "#ffcc33",
          width: 2
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: "#ffcc33"
          })
        })
      })
    });

    this.map = new Map({
      layers: [raster, vector],
      target: "map",
      view: new View({
        center: [-11000000, 4600000],
        zoom: 4
      })
    });

    var modify = new Modify({ source: source });
    this.map.addInteraction(modify);
  }

  ngAfterViewInit() {
    const wktPoint = 'POINT(-102.96036309265152 42.34403599683588)'; 
    
    const wkt = new WKT();
    const geometry = wkt.readGeometry(wktPoint, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857',
    });
    const position = (geometry as Point).getCoordinates();


    const ov = new Overlay({
      element: document.getElementById('square'),
      position: position
    });

    this.map.addOverlay(ov);
  }
}
