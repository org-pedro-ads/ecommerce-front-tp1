import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterProducts } from './register-products';

describe('RegisterProducts', () => {
  let component: RegisterProducts;
  let fixture: ComponentFixture<RegisterProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterProducts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterProducts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
