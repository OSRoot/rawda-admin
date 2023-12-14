import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersOptionsPage } from './users-options.page';

describe('UsersOptionsPage', () => {
  let component: UsersOptionsPage;
  let fixture: ComponentFixture<UsersOptionsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UsersOptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
