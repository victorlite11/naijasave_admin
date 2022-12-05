import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinePaymentAccountComponent } from './online-payment-account.component';

describe('OnlinePaymentAccountComponent', () => {
  let component: OnlinePaymentAccountComponent;
  let fixture: ComponentFixture<OnlinePaymentAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlinePaymentAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinePaymentAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
