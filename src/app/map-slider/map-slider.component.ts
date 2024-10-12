import {
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  model,
} from '@angular/core';
import { MapComponent } from '@maplibre/ngx-maplibre-gl';
import { syncMaps } from './sync-maps';

@Component({
  selector: 'app-map-slider',
  standalone: true,
  imports: [],
  templateUrl: './map-slider.component.html',
  styleUrl: './map-slider.component.scss',
})
export class MapSliderComponent implements AfterViewInit {
  percentage = model(50);
  @ContentChild('first') firstMap!: MapComponent;
  @ContentChild('second') secondMap!: MapComponent;

  ngAfterViewInit() {
    this.firstMap.mapLoad.subscribe(() =>
      syncMaps(this.firstMap.mapInstance, this.secondMap.mapInstance),
    );
  }
}
