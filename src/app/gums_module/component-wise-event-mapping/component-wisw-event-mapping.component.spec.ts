import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentWiswEventMappingComponent } from './component-wisw-event-mapping.component';

describe('ComponentWiswEventMappingComponent', () => {
  let component: ComponentWiswEventMappingComponent;
  let fixture: ComponentFixture<ComponentWiswEventMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentWiswEventMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentWiswEventMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
