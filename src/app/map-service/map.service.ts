import { Injectable } from '@angular/core';
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import Stamen from 'ol/source/Stamen';
import { Attribution, defaults } from 'ol/control';
import Map from 'ol/Map';
import View from 'ol/View';
import Swipe from 'ol-ext/control/Swipe';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { distinctUntilChanged } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class MapService {
  map: Map | undefined;
  swipe: Swipe | undefined;
  swipeLeft: boolean = false;
  labelsVisible: boolean = true;
  labels = new TileLayer({
    opacity: 0.4,
    source: new Stamen({ layer: 'toner-hybrid', transition: 1000 }),
  });
  private attribution = new Attribution({
    collapsible: true,
    collapsed: true,
  });

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {}

  setupMap() {
    proj4.defs(
      'EPSG:3068',
      '+proj=cass +lat_0=52.41864827777778 +lon_0=13.62720366666667 +x_0=40000 +y_0=10000 +ellps=bessel +towgs84=598.1,73.7,418.2,0.202,0.045,-2.455,6.7 +units=m +no_defs'
    );
    register(proj4);
    const berlinOld = new TileLayer({
      source: new XYZ({
        url: 'https://tiles.codefor.de/berlin-1928/{z}/{x}/{y}.png',
        attributions: [
          '<a href="https://fbinter.stadt-berlin.de/fb/berlin/service.jsp?id=k_luftbild1928@senstadt&type=WMS">Geoportal Berlin / Luftbilder 1928 </a><br>',
        ],
      }),
    });
    const berlinNew = new TileLayer({
      source: new XYZ({
        url: 'https://tiles.codefor.de/berlin-2020-truedop20rgb/{z}/{x}/{y}.png',
        attributions: [
          '<a href="https://fbinter.stadt-berlin.de/fb/berlin/service.jsp?id=k_luftbild2020_rgb@senstadt&type=WMS">Geoportal Berlin / Luftbilder 2020 </a><br>',
        ],
      }),
    });

    this.map = new Map({
      target: 'map',
      layers: [berlinNew, berlinOld, this.labels],
      view: new View({
        center: [1492432.977268, 6894161.329153],
        zoom: 13,
        maxZoom: 18,
      }),
      controls: defaults({ attribution: false }).extend([this.attribution]),
    });
    this.setupSwipeControl(berlinOld, berlinNew);
  }

  toggleSwipe() {
    const swipePercentage = this.swipeLeft ? 0.05 : 0.95;
    this.setSwipe(swipePercentage);
    this.swipeLeft = !this.swipeLeft;
  }

  setSwipe(value: number, updateQuery = true) {
    this.swipe?.set('position', value);
    if (updateQuery) {
      this.setQueryParams({ swipe: value });
    }
  }

  toggleLabels(visible = !this.labelsVisible) {
    this.labels.setVisible(visible);
    this.labelsVisible = visible;
    this.setQueryParams({ labels: visible });
  }

  private setupSwipeControl(
    berlinOld: TileLayer<XYZ>,
    berlinNew: TileLayer<XYZ>
  ) {
    const swipeOrientation = this.breakpointObserver.isMatched(
      Breakpoints.HandsetPortrait
    )
      ? 'horizontal'
      : 'vertical';
    this.swipe = new Swipe({ layers: berlinOld, rightLayers: berlinNew });
    this.swipe.setProperties({ orientation: swipeOrientation });
    // @ts-ignore
    this.swipe.on('moving', (x: any) => {
      this.setQueryParams({ swipe: Math.round(x.position[0] * 100) / 100 });
    });
    this.map!.addControl(this.swipe);
    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait])
      .pipe(distinctUntilChanged(), untilDestroyed(this))
      .subscribe((change) => {
        const swipeOrientation = change?.matches ? 'horizontal' : 'vertical';
        this.swipe?.setProperties({ orientation: swipeOrientation });
        this.attribution.setCollapsed(true);
      });
  }

  private setQueryParams(params: any) {
    this.router.navigate([], {
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }
}
