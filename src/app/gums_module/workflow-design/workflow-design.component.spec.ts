import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowDesignComponent } from './workflow-design.component';

describe('WorkflowDesignComponent', () => {
  let component: WorkflowDesignComponent;
  let fixture: ComponentFixture<WorkflowDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowDesignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkflowDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
