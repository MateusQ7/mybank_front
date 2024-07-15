import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpCardsComponent } from './pop-up-cards.component';

describe('PopUpCardsComponent', () => {
  let component: PopUpCardsComponent;
  let fixture: ComponentFixture<PopUpCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
