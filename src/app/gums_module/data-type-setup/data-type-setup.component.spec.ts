import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTypeSetupComponent } from './data-type-setup.component';

describe('DataTypeSetupComponent', () => {
  let component: DataTypeSetupComponent;
  let fixture: ComponentFixture<DataTypeSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTypeSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataTypeSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
