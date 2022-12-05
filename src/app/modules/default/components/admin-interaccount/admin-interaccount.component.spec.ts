import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInteraccountComponent } from './admin-interaccount.component';

describe('AdminInteraccountComponent', () => {
  let component: AdminInteraccountComponent;
  let fixture: ComponentFixture<AdminInteraccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminInteraccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInteraccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
