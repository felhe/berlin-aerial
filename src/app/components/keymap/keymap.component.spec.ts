import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeymapComponent } from './keymap.component';

describe('KeymapComponent', () => {
  let component: KeymapComponent;
  let fixture: ComponentFixture<KeymapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeymapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeymapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
