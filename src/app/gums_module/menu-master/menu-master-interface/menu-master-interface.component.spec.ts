import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMasterInterfaceComponent } from './menu-master-interface.component';

describe('MenuMasterInterfaceComponent', () => {
  let component: MenuMasterInterfaceComponent;
  let fixture: ComponentFixture<MenuMasterInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuMasterInterfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuMasterInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
