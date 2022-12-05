import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributorOverseerCardComponent } from './contributor-overseer-card.component';

describe('ContributorOverseerCardComponent', () => {
  let component: ContributorOverseerCardComponent;
  let fixture: ComponentFixture<ContributorOverseerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributorOverseerCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributorOverseerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
