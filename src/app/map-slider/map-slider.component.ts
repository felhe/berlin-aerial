import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  HostListener,
  input,
  InputSignal,
  model,
} from '@angular/core';
import { syncMaps } from './sync-maps';
import { Map } from 'maplibre-gl';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-map-slider',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './map-slider.component.html',
  styleUrl: './map-slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapSliderComponent implements AfterViewInit {
  map1: InputSignal<Map> = input.required();
  map2: InputSignal<Map> = input.required();
  percentage = model(50);
  orientation = input<'horizontal' | 'vertical'>('vertical');

  constructor() {
    effect(() => {
      syncMaps(this.map1(), this.map2());
    });
  }

  ngAfterViewInit() {}

  clipPath = computed(() => {
    // 'inset(0 0 0 ' + percentage() + '%)'
    if (this.orientation() === 'vertical') {
      return 'inset(0 0 0 ' + this.percentage() + '%)';
    }
    return `inset(${this.percentage()}% 0 0 0)`;
  });

  sliderLeft = computed(() => {
    if (this.orientation() === 'horizontal') {
      return '0';
    }
    return `calc(${this.percentage()}% - 3px)`;
  });

  sliderTop = computed(() => {
    if (this.orientation() === 'horizontal') {
      return `calc(${this.percentage()}% - 3px)`;
    }
    return '0';
  });

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
    const clientY =
      event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
    const mapWrapper = document.querySelector('.map-wrapper') as HTMLElement;

    if (mapWrapper) {
      const rect = mapWrapper.getBoundingClientRect();
      let newPercentage;

      if (this.orientation() === 'vertical') {
        const offsetX = clientX - rect.left;
        newPercentage = (offsetX / rect.width) * 100;
      } else {
        const offsetY = clientY - rect.top;
        newPercentage = (offsetY / rect.height) * 100;
      }

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
