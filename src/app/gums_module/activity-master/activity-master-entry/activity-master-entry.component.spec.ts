import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityMasterEntryComponent } from './activity-master-entry.component';

describe('ActivityMasterEntryComponent', () => {
  let component: ActivityMasterEntryComponent;
  let fixture: ComponentFixture<ActivityMasterEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityMasterEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityMasterEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
