import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeContributorOverseerComponent } from './change-contributor-overseer.component';

describe('ChangeContributorOverseerComponent', () => {
  let component: ChangeContributorOverseerComponent;
  let fixture: ComponentFixture<ChangeContributorOverseerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeContributorOverseerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeContributorOverseerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
