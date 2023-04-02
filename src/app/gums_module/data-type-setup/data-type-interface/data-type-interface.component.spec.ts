import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTypeInterfaceComponent } from './data-type-interface.component';

describe('DataTypeInterfaceComponent', () => {
  let component: DataTypeInterfaceComponent;
  let fixture: ComponentFixture<DataTypeInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTypeInterfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataTypeInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
