import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMasterInterface1Component } from './menu-master-interface1.component';

describe('MenuMasterInterface1Component', () => {
  let component: MenuMasterInterface1Component;
  let fixture: ComponentFixture<MenuMasterInterface1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuMasterInterface1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuMasterInterface1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
