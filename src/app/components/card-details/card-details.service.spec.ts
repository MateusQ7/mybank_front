import { TestBed } from '@angular/core/testing';

import { CardDetailsService } from './card-details.service';

describe('CardDetailsService', () => {
  let service: CardDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
