import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventWiseWorkflowComponent } from './event-wise-workflow.component';

describe('EventWiseWorkflowComponent', () => {
  let component: EventWiseWorkflowComponent;
  let fixture: ComponentFixture<EventWiseWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventWiseWorkflowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventWiseWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
