import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPersonalDataComponent } from './admin-personal-data.component';

describe('AdminPersonalDataComponent', () => {
  let component: AdminPersonalDataComponent;
  let fixture: ComponentFixture<AdminPersonalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPersonalDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPersonalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
