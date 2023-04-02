import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentEntryComponent } from './component-entry.component';

describe('ComponentEntryComponent', () => {
  let component: ComponentEntryComponent;
  let fixture: ComponentFixture<ComponentEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
