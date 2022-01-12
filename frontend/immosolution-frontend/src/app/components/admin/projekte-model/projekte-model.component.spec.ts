import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjekteModelComponent } from './projekte-model.component';

describe('ProjekteModelComponent', () => {
  let component: ProjekteModelComponent;
  let fixture: ComponentFixture<ProjekteModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjekteModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjekteModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
