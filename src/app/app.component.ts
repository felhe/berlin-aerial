import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  model,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  ControlComponent,
  ImageSourceComponent,
  MapComponent,
  NavigationControlDirective,
} from '@maplibre/ngx-maplibre-gl';
import { MapSliderComponent } from './map-slider/map-slider.component';
import { LngLatBoundsLike, StyleSpecification } from 'maplibre-gl';
import { Sources } from './sources';
import { PrimeNGConfig } from 'primeng/api';
import { Aura } from 'primeng/themes/aura';
import { ButtonModule } from 'primeng/button';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MapComponent,
    MapSliderComponent,
    ImageSourceComponent,
    ControlComponent,
    NavigationControlDirective,
    ButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  firstYear: WritableSignal<Sources> = signal(Sources.Berlin1928);
  secondYear: WritableSignal<string> = signal(Sources.Berlin2024);
  http: HttpClient = inject(HttpClient);
  baseUrl = 'berlin-tiles.heit.dev';
  mapStyle: StyleSpecification = {
    center: [13.404954, 52.520008],
    zoom: 15,
    version: 8,
    sources: {},
    layers: [
      {
        id: 'aerial',
        type: 'raster',
        source: 'aerial',
        layout: {
          visibility: 'visible',
        },
      },
      {
        id: 'mask-outside-berlin',
        type: 'fill',
        source: 'berlin-boundary',
        paint: {
          'fill-color': '#FFF', // White fill for outside the boundary
          'fill-opacity': 1, // Opacity of the fill
        },
      },
    ],
  };

  berlinBoundary = toSignal(this.http.get('/berlin.geojson'));
  fitBounds: LngLatBoundsLike = [
    [12.7, 52.31], // Southwest corner (approximate)
    [14, 52.707], // Northeast corner (approximate)
  ];

  firstMapConfig: Signal<StyleSpecification> = computed(() => {
    const style: StyleSpecification = { ...this.mapStyle };
    style.sources = {
      aerial: {
        type: 'raster',
        tiles: [`https://${this.baseUrl}/${this.firstYear()}/{z}/{x}/{y}.png`],
        tileSize: 128,
        minzoom: 10,
        maxzoom: 20,
      },
      'berlin-boundary': {
        type: 'geojson',
        data: this.berlinBoundary() as string,
      },
    };
    return style;
  });
  secondMapConfig: Signal<StyleSpecification> = computed(() => {
    const style: StyleSpecification = { ...this.mapStyle };
    style.sources = {
      aerial: {
        type: 'raster',
        tiles: [`https://${this.baseUrl}/${this.secondYear()}/{z}/{x}/{y}.png`],
        tileSize: 256,
        minzoom: 10,
        maxzoom: 20,
      },
      'berlin-boundary': {
        type: 'geojson',
        data: this.berlinBoundary() as string,
      },
    };
    return style;
  });
  swipePercentage = model(50);
  swipeOffsetLeft = computed(() => {
    return `calc(${this.swipePercentage()}% - 150px)`;
  });
  swipeOffsetRight = computed(() => {
    return `calc(${this.swipePercentage()}% + 150px)`;
  });

  constructor(private config: PrimeNGConfig) {
    this.config.theme.set({ preset: Aura });
  }
}
