import { TestBed } from '@angular/core/testing';

import { ModelapiService } from './modelapi.service';

describe('ModelapiService', () => {
  let service: ModelapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
