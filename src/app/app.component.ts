import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
import { StyleSpecification } from 'maplibre-gl';
import { Sources } from './sources';
import { PrimeNGConfig } from 'primeng/api';
import { Aura } from 'primeng/themes/aura';
import { ButtonModule } from 'primeng/button';

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
    ],
  };

  firstMapConfig: Signal<StyleSpecification> = computed(() => {
    const style: StyleSpecification = { ...this.mapStyle };
    style.sources = {
      aerial: {
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
      aerial: {
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
