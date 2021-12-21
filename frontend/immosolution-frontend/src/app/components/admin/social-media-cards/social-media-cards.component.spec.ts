import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaCardsComponent } from './social-media-cards.component';

describe('SocialMediaCardsComponent', () => {
  let component: SocialMediaCardsComponent;
  let fixture: ComponentFixture<SocialMediaCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialMediaCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMediaCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
