import { TestBed } from '@angular/core/testing';

import { PopUpTransferService } from './pop-up-transfer.service';

describe('PopUpTransferService', () => {
  let service: PopUpTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopUpTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
