import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpAccountDetaisComponent } from './pop-up-account-detais.component';

describe('PopUpAccountDetaisComponent', () => {
  let component: PopUpAccountDetaisComponent;
  let fixture: ComponentFixture<PopUpAccountDetaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpAccountDetaisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpAccountDetaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
