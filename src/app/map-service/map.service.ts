import { Injectable } from '@angular/core';
import proj4 from "proj4";
import {register} from "ol/proj/proj4";
import TileLayer from "ol/layer/Tile";
import {Stamen, XYZ} from "ol/source";
import {Attribution, defaults} from "ol/control";
import Map from "ol/Map";
import {View} from "ol";
import Swipe from "ol-ext/control/Swipe";

@Injectable({
  providedIn: 'root'
})
export class MapService {
  map: Map | undefined;
  swipe: Swipe | undefined;
  swipeLeft: boolean = false;
  labelsVisible: boolean = true;
  labels = new TileLayer({
    opacity: 0.4,
    source: new Stamen({layer: 'toner-hybrid', transition: 1000}),
  });

  constructor() { }

  setupMap() {
    proj4.defs("EPSG:3068", "+proj=cass +lat_0=52.41864827777778 +lon_0=13.62720366666667 +x_0=40000 +y_0=10000 +ellps=bessel +towgs84=598.1,73.7,418.2,0.202,0.045,-2.455,6.7 +units=m +no_defs");
    register(proj4);
    const berlinOld = new TileLayer({
      source: new XYZ({
        url: 'https://tiles.codefor.de/berlin-1928/{z}/{x}/{y}.png',
        attributions: [
          '<a href="https://fbinter.stadt-berlin.de/fb/berlin/service.jsp?id=k_luftbild1928@senstadt&type=WMS">Geoportal Berlin / Luftbilder 1928 </a><br>'
        ]
      })
    });
    const berlinNew = new TileLayer({
      source: new XYZ({
        url: 'https://tiles.codefor.de/berlin-2020-truedop20rgb/{z}/{x}/{y}.png',
        attributions: [
          '<a href="https://fbinter.stadt-berlin.de/fb/berlin/service.jsp?id=k_luftbild2020_rgb@senstadt&type=WMS">Geoportal Berlin / Luftbilder 2020 </a><br>'
        ]
      })
    });
    const attribution = new Attribution({
      collapsible: false
    })
    this.map = new Map({
      target: 'map',
      layers: [
        berlinNew,
        berlinOld,
        this.labels
      ],
      view: new View({
        center: [1492432.977268, 6894161.329153],
        zoom: 13,
        maxZoom: 18
      }),
      controls: defaults({attribution: false}).extend([attribution]),
    })
    this.swipe = new Swipe();
    this.swipe.addLayer(berlinOld, false);
    this.swipe.addLayer(berlinNew, true);
    this.map.addControl(this.swipe);
  }

  toggleSwipe() {
    this.swipeLeft ? this.swipe?.set('position', 0.05) : this.swipe?.set('position', 0.95);
    this.swipeLeft = !this.swipeLeft;
  }

  toggleLabels() {
    this.labels.setVisible(!this.labelsVisible);
    this.labelsVisible = !this.labelsVisible;
  }

}
