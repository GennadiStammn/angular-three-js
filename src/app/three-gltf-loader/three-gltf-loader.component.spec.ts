import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeGltfLoaderComponent } from './three-gltf-loader.component';

describe('ThreeGltfLoaderComponent', () => {
  let component: ThreeGltfLoaderComponent;
  let fixture: ComponentFixture<ThreeGltfLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeGltfLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeGltfLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
