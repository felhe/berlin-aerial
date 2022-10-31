import { Component } from '@angular/core';
import { MapService } from '../../map-service/map.service';

@Component({
  selector: 'app-zoom-control',
  templateUrl: './zoom-control.component.html',
  styleUrls: ['./zoom-control.component.css'],
})
export class ZoomControlComponent {
  constructor(private mapService: MapService) {}

  zoom(value: number) {
    const view = this.mapService.map?.getView();
    const zoom = view?.getZoom() || 0;
    view?.animate({ zoom: zoom + value, duration: 200 });
  }
}
