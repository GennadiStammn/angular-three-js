import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeGeometriesComponent } from './three-geometries.component';

describe('ThreeGeometriesComponent', () => {
  let component: ThreeGeometriesComponent;
  let fixture: ComponentFixture<ThreeGeometriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeGeometriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeGeometriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
