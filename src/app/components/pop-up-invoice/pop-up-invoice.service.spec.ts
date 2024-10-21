import { TestBed } from '@angular/core/testing';

import { PopUpInvoiceService } from './pop-up-invoice.service';

describe('PopUpInvoiceService', () => {
  let service: PopUpInvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopUpInvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
