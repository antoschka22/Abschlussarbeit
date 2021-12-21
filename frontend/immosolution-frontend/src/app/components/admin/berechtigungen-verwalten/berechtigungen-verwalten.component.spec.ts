import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BerechtigungenVerwaltenComponent } from './berechtigungen-verwalten.component';

describe('BerechtigungenVerwaltenComponent', () => {
  let component: BerechtigungenVerwaltenComponent;
  let fixture: ComponentFixture<BerechtigungenVerwaltenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BerechtigungenVerwaltenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BerechtigungenVerwaltenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
