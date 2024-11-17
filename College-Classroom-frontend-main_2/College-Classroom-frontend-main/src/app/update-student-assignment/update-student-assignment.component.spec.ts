import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStudentAssignmentComponent } from './update-student-assignment.component';

describe('UpdateStudentAssignmentComponent', () => {
  let component: UpdateStudentAssignmentComponent;
  let fixture: ComponentFixture<UpdateStudentAssignmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateStudentAssignmentComponent]
    });
    fixture = TestBed.createComponent(UpdateStudentAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
