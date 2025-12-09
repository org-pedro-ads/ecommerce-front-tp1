import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHistoryOrder } from './modal-history-order';

describe('ModalHistoryOrder', () => {
  let component: ModalHistoryOrder;
  let fixture: ComponentFixture<ModalHistoryOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalHistoryOrder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalHistoryOrder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
