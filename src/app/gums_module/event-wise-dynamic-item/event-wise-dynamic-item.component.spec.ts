import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventWiseDynamicItemComponent } from './event-wise-dynamic-item.component';

describe('EventWiseDynamicItemComponent', () => {
  let component: EventWiseDynamicItemComponent;
  let fixture: ComponentFixture<EventWiseDynamicItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventWiseDynamicItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventWiseDynamicItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
