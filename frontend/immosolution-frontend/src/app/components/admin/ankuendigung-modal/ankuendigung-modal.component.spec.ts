import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnkuendigungModalComponent } from './ankuendigung-modal.component';

describe('AnkuendigungModalComponent', () => {
  let component: AnkuendigungModalComponent;
  let fixture: ComponentFixture<AnkuendigungModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnkuendigungModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnkuendigungModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
