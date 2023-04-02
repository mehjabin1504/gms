import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventWiseDynamicItemInterfaceComponent } from './event-wise-dynamic-item-interface.component';

describe('EventWiseDynamicItemInterfaceComponent', () => {
  let component: EventWiseDynamicItemInterfaceComponent;
  let fixture: ComponentFixture<EventWiseDynamicItemInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventWiseDynamicItemInterfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventWiseDynamicItemInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
