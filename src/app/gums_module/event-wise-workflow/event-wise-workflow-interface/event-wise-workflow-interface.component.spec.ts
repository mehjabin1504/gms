import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventWiseWorkflowInterfaceComponent } from './event-wise-workflow-interface.component';

describe('EventWiseWorkflowInterfaceComponent', () => {
  let component: EventWiseWorkflowInterfaceComponent;
  let fixture: ComponentFixture<EventWiseWorkflowInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventWiseWorkflowInterfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventWiseWorkflowInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
