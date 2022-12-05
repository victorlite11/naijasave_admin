import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupRequestsEditComponent } from './signup-requests-edit.component';

describe('SignupRequestsEditComponent', () => {
  let component: SignupRequestsEditComponent;
  let fixture: ComponentFixture<SignupRequestsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupRequestsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupRequestsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
