import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentMasterInterfaceComponent } from './component-master-interface.component';

describe('ComponentMasterInterfaceComponent', () => {
  let component: ComponentMasterInterfaceComponent;
  let fixture: ComponentFixture<ComponentMasterInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentMasterInterfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentMasterInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
