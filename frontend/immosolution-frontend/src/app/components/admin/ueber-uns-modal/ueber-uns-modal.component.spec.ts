import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UeberUnsModalComponent } from './ueber-uns-modal.component';

describe('UeberUnsModalComponent', () => {
  let component: UeberUnsModalComponent;
  let fixture: ComponentFixture<UeberUnsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UeberUnsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UeberUnsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
