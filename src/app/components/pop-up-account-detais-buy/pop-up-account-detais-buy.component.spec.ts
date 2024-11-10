import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpAccountDetaisBuyComponent } from './pop-up-account-detais-buy.component';

describe('PopUpAccountDetaisBuyComponent', () => {
  let component: PopUpAccountDetaisBuyComponent;
  let fixture: ComponentFixture<PopUpAccountDetaisBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpAccountDetaisBuyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpAccountDetaisBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
