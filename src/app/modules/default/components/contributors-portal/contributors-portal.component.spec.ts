import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributorsPortalComponent } from './contributors-portal.component';

describe('ContributorsPortalComponent', () => {
  let component: ContributorsPortalComponent;
  let fixture: ComponentFixture<ContributorsPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributorsPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributorsPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
