import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentsEventListComponent } from './tournaments-event-list.component';

describe('TournamentsEventListComponent', () => {
  let component: TournamentsEventListComponent;
  let fixture: ComponentFixture<TournamentsEventListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentsEventListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentsEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
