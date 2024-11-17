import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTeacherAssignmentComponent } from './update-teacher-assignment.component';

describe('UpdateTeacherAssignmentComponent', () => {
  let component: UpdateTeacherAssignmentComponent;
  let fixture: ComponentFixture<UpdateTeacherAssignmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateTeacherAssignmentComponent]
    });
    fixture = TestBed.createComponent(UpdateTeacherAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
