import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleDiaComponent } from './detalle-dia.component';

describe('DetalleDiaComponent', () => {
  let component: DetalleDiaComponent;
  let fixture: ComponentFixture<DetalleDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleDiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
