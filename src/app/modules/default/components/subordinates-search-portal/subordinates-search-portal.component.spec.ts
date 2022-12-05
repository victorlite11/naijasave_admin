import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubordinatesSearchPortalComponent } from './subordinates-search-portal.component';

describe('SubordinatesSearchPortalComponent', () => {
  let component: SubordinatesSearchPortalComponent;
  let fixture: ComponentFixture<SubordinatesSearchPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubordinatesSearchPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubordinatesSearchPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
