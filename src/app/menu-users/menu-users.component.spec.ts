import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuUsersComponent } from './menu-users.component';

describe('MenuUsersComponent', () => {
  let component: MenuUsersComponent;
  let fixture: ComponentFixture<MenuUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
