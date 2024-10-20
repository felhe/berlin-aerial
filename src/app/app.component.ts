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
import { Source, TILE_SOURCES } from './sources';
import { PrimeNGConfig } from 'primeng/api';
import { Aura } from 'primeng/themes/aura';
import { ButtonModule } from 'primeng/button';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { SelectSourceComponent } from './select-source/select-source.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { environment } from '../environments/environment';

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
    SelectSourceComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  firstSource: WritableSignal<Source> = signal(TILE_SOURCES['berlin-1928']);
  secondSource: WritableSignal<Source> = signal(TILE_SOURCES['berlin-2024']);
  breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  isHorizontal: Signal<boolean | undefined> = toSignal(
    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait])
      .pipe(map((result) => result.matches)),
  );
  http: HttpClient = inject(HttpClient);
  baseUrl = environment.tilesBaseUrl;
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
    [12.788345, 52.318271],
    [13.9811609, 52.7055087],
  ];

  firstMapConfig: Signal<StyleSpecification> = computed(() => {
    const style: StyleSpecification = { ...this.mapStyle };
    style.sources = {
      aerial: {
        type: 'raster',
        tiles: [`${this.baseUrl}/${this.firstSource().url}/{z}/{x}/{y}.png`],
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
        tiles: [`${this.baseUrl}/${this.secondSource().url}/{z}/{x}/{y}.png`],
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
    if (this.isHorizontal()) {
      return '50%';
    }
    return `calc(${this.swipePercentage()}% - 150px)`;
  });
  swipeOffsetRight = computed(() => {
    if (this.isHorizontal()) {
      return '50%';
    }
    return `calc(${this.swipePercentage()}% + 150px)`;
  });

  constructor(private config: PrimeNGConfig) {
    this.config.theme.set({ preset: Aura });
  }
}
