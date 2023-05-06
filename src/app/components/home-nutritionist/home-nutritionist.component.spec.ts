import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNutritionistComponent } from './home-nutritionist.component';

describe('HomeNutritionistComponent', () => {
  let component: HomeNutritionistComponent;
  let fixture: ComponentFixture<HomeNutritionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeNutritionistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeNutritionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
