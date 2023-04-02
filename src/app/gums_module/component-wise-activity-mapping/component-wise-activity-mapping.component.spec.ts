import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentWiseActivityMappingComponent } from './component-wise-activity-mapping.component';

describe('ComponentWiseActivityMappingComponent', () => {
  let component: ComponentWiseActivityMappingComponent;
  let fixture: ComponentFixture<ComponentWiseActivityMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentWiseActivityMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentWiseActivityMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
