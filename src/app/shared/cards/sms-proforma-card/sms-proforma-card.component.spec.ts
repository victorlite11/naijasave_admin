import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsProformaCardComponent } from './sms-proforma-card.component';

describe('SmsProformaCardComponent', () => {
  let component: SmsProformaCardComponent;
  let fixture: ComponentFixture<SmsProformaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsProformaCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsProformaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
