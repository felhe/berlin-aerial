import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from '@maplibre/ngx-maplibre-gl';
import { MapSliderComponent } from './map-slider/map-slider.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapComponent, MapSliderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild('first') firstMap!: MapComponent;
  @ViewChild('second') secondMap!: MapComponent;
}
