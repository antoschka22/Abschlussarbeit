import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebseiteVerwaltenComponent } from './webseite-verwalten.component';

describe('WebseiteVerwaltenComponent', () => {
  let component: WebseiteVerwaltenComponent;
  let fixture: ComponentFixture<WebseiteVerwaltenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebseiteVerwaltenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebseiteVerwaltenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
