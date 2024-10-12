import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  HostListener,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  private isDragging = false;

  // Start drag event for mouse and touch
  startDrag(event: MouseEvent | TouchEvent): void {
    this.isDragging = true;
    event.preventDefault();
  }

  // Listen to global mouse/touch move events
  @HostListener('window:mousemove', ['$event'])
  @HostListener('window:touchmove', ['$event'])
  onDrag(event: MouseEvent | TouchEvent): void {
    if (!this.isDragging) return;

    const clientX =
      event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    const mapWrapper = document.querySelector('.map-wrapper') as HTMLElement;

    if (mapWrapper) {
      const rect = mapWrapper.getBoundingClientRect();
      const offsetX = clientX - rect.left;
      const newPercentage = (offsetX / rect.width) * 100;
      this.percentage.set(Math.max(0, Math.min(100, newPercentage))); // Keep between 0 and 100
    }
  }

  // End drag event for mouse and touch
  @HostListener('window:mouseup')
  @HostListener('window:touchend')
  endDrag(): void {
    this.isDragging = false;
  }
}
