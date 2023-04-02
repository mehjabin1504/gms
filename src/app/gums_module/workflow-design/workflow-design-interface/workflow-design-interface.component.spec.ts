import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowDesignInterfaceComponent } from './workflow-design-interface.component';

describe('WorkflowDesignInterfaceComponent', () => {
  let component: WorkflowDesignInterfaceComponent;
  let fixture: ComponentFixture<WorkflowDesignInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowDesignInterfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkflowDesignInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
