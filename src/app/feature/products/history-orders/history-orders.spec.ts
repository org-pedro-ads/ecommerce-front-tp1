import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryOrders } from './history-orders';

describe('HistoryOrders', () => {
  let component: HistoryOrders;
  let fixture: ComponentFixture<HistoryOrders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryOrders]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryOrders);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
