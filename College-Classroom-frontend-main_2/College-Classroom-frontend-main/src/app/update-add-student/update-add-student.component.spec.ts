import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAddStudentComponent } from './update-add-student.component';

describe('UpdateAddStudentComponent', () => {
  let component: UpdateAddStudentComponent;
  let fixture: ComponentFixture<UpdateAddStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateAddStudentComponent]
    });
    fixture = TestBed.createComponent(UpdateAddStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
