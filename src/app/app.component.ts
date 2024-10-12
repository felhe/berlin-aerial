import {
  Component,
  computed,
  Signal,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImageSourceComponent, MapComponent } from '@maplibre/ngx-maplibre-gl';
import { MapSliderComponent } from './map-slider/map-slider.component';
import { StyleSpecification } from 'maplibre-gl';
import { Sources } from './sources';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MapComponent,
    MapSliderComponent,
    ImageSourceComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild('first') firstMapRef!: MapComponent;
  @ViewChild('second') secondMapRef!: MapComponent;
  private firstYear: WritableSignal<Sources> = signal(Sources.Berlin1928);
  private secondYear: WritableSignal<string> = signal(Sources.Berlin2024);
  private mapStyle: StyleSpecification = {
    center: [13.404954, 52.520008],
    zoom: 15,
    version: 8,
    sources: {},
    layers: [
      {
        id: 'satellite',
        type: 'raster',
        source: 'satellite',
        layout: {
          visibility: 'visible',
        },
      },
    ],
  };

  firstMapConfig: Signal<StyleSpecification> = computed(() => {
    const style: StyleSpecification = { ...this.mapStyle };
    style.sources = {
      satellite: {
        type: 'raster',
        tiles: [`https://tiles.codefor.de/${this.firstYear()}/{z}/{x}/{y}.png`],
        tileSize: 128,
        minzoom: 10,
        maxzoom: 20,
      },
    };
    return style;
  });
  secondMapConfig: Signal<StyleSpecification> = computed(() => {
    const style: StyleSpecification = { ...this.mapStyle };
    style.sources = {
      satellite: {
        type: 'raster',
        tiles: [
          `https://tiles.codefor.de/${this.secondYear()}/{z}/{x}/{y}.png`,
        ],
        tileSize: 256,
        minzoom: 10,
        maxzoom: 20,
      },
    };
    return style;
  });
}
