import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarFrontendComponent } from './navbar-frontend.component';

describe('NavbarFrontendComponent', () => {
  let component: NavbarFrontendComponent;
  let fixture: ComponentFixture<NavbarFrontendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarFrontendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarFrontendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
