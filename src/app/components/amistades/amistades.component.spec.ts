import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmistadesComponent } from './amistades.component';

describe('AmistadesComponent', () => {
  let component: AmistadesComponent;
  let fixture: ComponentFixture<AmistadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmistadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmistadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
