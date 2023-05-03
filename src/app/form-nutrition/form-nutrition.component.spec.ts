import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNutritionComponent } from './form-nutrition.component';

describe('FormNutritionComponent', () => {
  let component: FormNutritionComponent;
  let fixture: ComponentFixture<FormNutritionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormNutritionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormNutritionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
