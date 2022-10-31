import { Component, OnInit } from '@angular/core';
import { MapService } from './map-service/map.service';
import { ActivatedRoute, Router } from '@angular/router';
import { skip, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private mapService: MapService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mapService.setupMap();
    this.route.queryParams.pipe(skip(1), take(1)).subscribe((queryParams) => {
      /**
       * If the query-string is '?genre=rpg&platform=xbox'
       * the queryParams object will look like
       * { platform: 'xbox', genre: 'rpg }
       * */
      const swipeValue = queryParams?.swipe || 0.5;
      const showLabels = queryParams?.labels === 'true';
      this.mapService.setSwipe(swipeValue);
      this.mapService.toggleLabels(showLabels);
    });
  }

  toggleSwipe() {
    this.mapService.toggleSwipe();
  }

  toggleLabels() {
    this.mapService.toggleLabels();
  }
}
