import { TestBed } from '@angular/core/testing';

import { ConfigDetailsService } from './config-details.service';

describe('ConfigDetailsService', () => {
  let service: ConfigDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
