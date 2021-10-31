import { Component, OnInit } from '@angular/core';
import {MapService} from "../../map-service/map.service";

@Component({
  selector: 'app-keymap',
  templateUrl: './keymap.component.html',
  styleUrls: ['./keymap.component.css']
})
export class KeymapComponent implements OnInit {

  constructor(public mapService: MapService) { }

  ngOnInit(): void {
  }

}
