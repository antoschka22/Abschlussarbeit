import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FertigeprojekteComponent } from './fertigeprojekte.component';

describe('FertigeprojekteComponent', () => {
  let component: FertigeprojekteComponent;
  let fixture: ComponentFixture<FertigeprojekteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FertigeprojekteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FertigeprojekteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
