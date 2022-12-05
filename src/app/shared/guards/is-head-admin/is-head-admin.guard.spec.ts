import { TestBed } from '@angular/core/testing';

import { IsHeadAdminGuard } from './is-head-admin.guard';

describe('IsHeadAdminGuard', () => {
  let guard: IsHeadAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsHeadAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
