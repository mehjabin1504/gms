import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentWiseActivityMappingEntryComponent } from './component-wise-activity-mapping-entry.component';

describe('ComponentWiseActivityMappingEntryComponent', () => {
  let component: ComponentWiseActivityMappingEntryComponent;
  let fixture: ComponentFixture<ComponentWiseActivityMappingEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentWiseActivityMappingEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentWiseActivityMappingEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
