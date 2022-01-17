import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProjectImagesComponent } from './delete-project-images.component';

describe('DeleteProjectImagesComponent', () => {
  let component: DeleteProjectImagesComponent;
  let fixture: ComponentFixture<DeleteProjectImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteProjectImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProjectImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
