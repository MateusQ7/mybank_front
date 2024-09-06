import { TestBed } from '@angular/core/testing';

import { PopUpCardService } from './pop-up-cards.service';

describe('PopUpCardsService', () => {
  let service: PopUpCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopUpCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
