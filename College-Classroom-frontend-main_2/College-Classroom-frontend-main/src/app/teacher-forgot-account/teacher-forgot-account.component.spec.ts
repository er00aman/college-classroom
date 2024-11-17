import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherForgotAccountComponent } from './teacher-forgot-account.component';

describe('TeacherForgotAccountComponent', () => {
  let component: TeacherForgotAccountComponent;
  let fixture: ComponentFixture<TeacherForgotAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherForgotAccountComponent]
    });
    fixture = TestBed.createComponent(TeacherForgotAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
