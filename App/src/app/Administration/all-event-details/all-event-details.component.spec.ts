import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEventDetailsComponent } from './all-event-details.component';

describe('AllEventDetailsComponent', () => {
  let component: AllEventDetailsComponent;
  let fixture: ComponentFixture<AllEventDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllEventDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
