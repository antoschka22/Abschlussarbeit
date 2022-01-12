import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamModelComponent } from './team-model.component';

describe('TeamModelComponent', () => {
  let component: TeamModelComponent;
  let fixture: ComponentFixture<TeamModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
