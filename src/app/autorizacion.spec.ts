import { TestBed } from '@angular/core/testing';

import { Autorizacion } from './autorizacion';

describe('Autorizacion', () => {
  let service: Autorizacion;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Autorizacion);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
