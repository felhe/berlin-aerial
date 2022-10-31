import { Component } from '@angular/core';
import { MapService } from '../../map-service/map.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-keymap',
  templateUrl: './keymap.component.html',
  styleUrls: ['./keymap.component.css'],
})
export class KeymapComponent {
  isMobile$ = this.breakpointObserver.observe([Breakpoints.Handset]).pipe(
    map((change) => change.matches),
    distinctUntilChanged(),
    shareReplay()
  );
  modalVisible = false;

  constructor(
    public mapService: MapService,
    private breakpointObserver: BreakpointObserver
  ) {}
}
