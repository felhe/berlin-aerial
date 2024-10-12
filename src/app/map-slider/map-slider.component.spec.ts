import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSliderComponent } from './map-slider.component';

describe('MapSliderComponent', () => {
  let component: MapSliderComponent;
  let fixture: ComponentFixture<MapSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
