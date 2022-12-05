import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSmsProformaComponent } from './create-sms-proforma.component';

describe('CreateSmsProformaComponent', () => {
  let component: CreateSmsProformaComponent;
  let fixture: ComponentFixture<CreateSmsProformaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSmsProformaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSmsProformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
