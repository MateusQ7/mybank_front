import { TestBed } from '@angular/core/testing';

import { TransferDetailsService } from './transfer-details.service';

describe('TransferDetailsService', () => {
  let service: TransferDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
