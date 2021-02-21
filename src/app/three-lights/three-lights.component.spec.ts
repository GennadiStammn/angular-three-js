import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeLightsComponent } from './three-lights.component';

describe('ThreeLightsComponent', () => {
  let component: ThreeLightsComponent;
  let fixture: ComponentFixture<ThreeLightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeLightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeLightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
