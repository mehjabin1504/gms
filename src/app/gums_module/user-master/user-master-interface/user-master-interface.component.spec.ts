import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMasterInterfaceComponent } from './user-master-interface.component';

describe('UserMasterInterfaceComponent', () => {
  let component: UserMasterInterfaceComponent;
  let fixture: ComponentFixture<UserMasterInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMasterInterfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMasterInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
