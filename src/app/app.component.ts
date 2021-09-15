import {Component, OnInit} from '@angular/core';
import Map from 'ol/Map';
import {Stamen, XYZ} from "ol/source";
import TileLayer from "ol/layer/Tile";
import {View} from "ol";
import proj4 from 'proj4';
import {register} from "ol/proj/proj4";
import Swipe from "ol-ext/control/Swipe";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  map: Map | undefined;
  swipe: Swipe | undefined;
  swipeLeft: boolean = false;
  labelsVisible: boolean = true;
  labels = new TileLayer({
    opacity: 0.4,
    source: new Stamen({layer: 'toner-hybrid'})
  });

  ngOnInit(): void {
    proj4.defs("EPSG:3068", "+proj=cass +lat_0=52.41864827777778 +lon_0=13.62720366666667 +x_0=40000 +y_0=10000 +ellps=bessel +towgs84=598.1,73.7,418.2,0.202,0.045,-2.455,6.7 +units=m +no_defs");
    register(proj4);
    const berlinOld = new TileLayer({
      source: new XYZ({
        url: 'https://tiles.codefor.de/berlin-1928/{z}/{x}/{y}.png'
      })
    });
    const berlinNew = new TileLayer({
      source: new XYZ({
        url: 'https://tiles.codefor.de/berlin-2020-truedop20rgb/{z}/{x}/{y}.png'
      })
    });
    this.map = new Map({
      target: 'map',
      layers: [
        berlinNew,
        berlinOld,
        this.labels
      ],
      view: new View({
        center: [1492432.977268, 6894161.329153],
        zoom: 12,
        maxZoom: 18
      })
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
    console.log('sdafsa');
  }
}
