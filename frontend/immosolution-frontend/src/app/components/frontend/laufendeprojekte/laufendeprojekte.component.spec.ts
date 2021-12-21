import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaufendeprojekteComponent } from './laufendeprojekte.component';

describe('LaufendeprojekteComponent', () => {
  let component: LaufendeprojekteComponent;
  let fixture: ComponentFixture<LaufendeprojekteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaufendeprojekteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaufendeprojekteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
