import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleMasterInterfaceComponent } from './role-master-interface.component';

describe('RoleMasterInterfaceComponent', () => {
  let component: RoleMasterInterfaceComponent;
  let fixture: ComponentFixture<RoleMasterInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleMasterInterfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleMasterInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
