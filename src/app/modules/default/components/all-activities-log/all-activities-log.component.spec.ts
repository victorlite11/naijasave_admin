import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllActivitiesLogComponent } from './all-activities-log.component';

describe('AllActivitiesLogComponent', () => {
  let component: AllActivitiesLogComponent;
  let fixture: ComponentFixture<AllActivitiesLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllActivitiesLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllActivitiesLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
