import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEntrenoComponent } from './form-entreno.component';

describe('FormEntrenoComponent', () => {
  let component: FormEntrenoComponent;
  let fixture: ComponentFixture<FormEntrenoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEntrenoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEntrenoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
