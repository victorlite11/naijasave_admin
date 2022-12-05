import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTradingBalanceComponent } from './update-trading-balance.component';

describe('UpdateTradingBalanceComponent', () => {
  let component: UpdateTradingBalanceComponent;
  let fixture: ComponentFixture<UpdateTradingBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTradingBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTradingBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
