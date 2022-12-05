import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyCommissionComponent } from './company-commission.component';

describe('CompanyCommissionComponent', () => {
  let component: CompanyCommissionComponent;
  let fixture: ComponentFixture<CompanyCommissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyCommissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
