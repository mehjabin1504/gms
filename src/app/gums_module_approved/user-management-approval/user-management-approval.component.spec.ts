import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementApprovalComponent } from './user-management-approval.component';

describe('UserManagementApprovalComponent', () => {
  let component: UserManagementApprovalComponent;
  let fixture: ComponentFixture<UserManagementApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserManagementApprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManagementApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
