import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpInvoiceComponent } from './pop-up-invoice.component';

describe('PopUpInvoiceComponent', () => {
  let component: PopUpInvoiceComponent;
  let fixture: ComponentFixture<PopUpInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
