import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeTextureComponent } from './three-texture.component';

describe('ThreeTextureComponent', () => {
  let component: ThreeTextureComponent;
  let fixture: ComponentFixture<ThreeTextureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeTextureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeTextureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
