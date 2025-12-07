import { TestBed } from '@angular/core/testing';

import { HistoryOrders } from './history-orders.service';

describe('HistoryOrders', () => {
  let service: HistoryOrders;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryOrders);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
