import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreePhysicsComponent } from './three-physics.component';

describe('ThreePhysicsComponent', () => {
  let component: ThreePhysicsComponent;
  let fixture: ComponentFixture<ThreePhysicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreePhysicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreePhysicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
