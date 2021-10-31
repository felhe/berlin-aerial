import {Component, OnInit} from '@angular/core';
import {MapService} from "./map-service/map.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private mapService: MapService) {
  }

  ngOnInit(): void {
    this.mapService.setupMap();
  }

  toggleSwipe() {
    this.mapService.toggleSwipe();
  }

  toggleLabels() {
    this.mapService.toggleLabels();
  }
}
