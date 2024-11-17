import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAddTeacherComponent } from './update-add-teacher.component';

describe('UpdateAddTeacherComponent', () => {
  let component: UpdateAddTeacherComponent;
  let fixture: ComponentFixture<UpdateAddTeacherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateAddTeacherComponent]
    });
    fixture = TestBed.createComponent(UpdateAddTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
