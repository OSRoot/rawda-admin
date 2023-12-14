import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddNotificationPage } from './add-notification.page';

describe('AddNotificationPage', () => {
  let component: AddNotificationPage;
  let fixture: ComponentFixture<AddNotificationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddNotificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
