import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingBalanceComponent } from './trading-balance.component';

describe('TradingBalanceComponent', () => {
  let component: TradingBalanceComponent;
  let fixture: ComponentFixture<TradingBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradingBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
