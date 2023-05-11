import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAthleteComponent } from './home-athlete.component';

describe('HomeAthleteComponent', () => {
  let component: HomeAthleteComponent;
  let fixture: ComponentFixture<HomeAthleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeAthleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAthleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
