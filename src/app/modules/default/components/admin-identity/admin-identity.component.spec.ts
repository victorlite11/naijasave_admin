import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIdentityComponent } from './admin-identity.component';

describe('AdminIdentityComponent', () => {
  let component: AdminIdentityComponent;
  let fixture: ComponentFixture<AdminIdentityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminIdentityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
