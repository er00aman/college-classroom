import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTeacherMaterialComponent } from './update-teacher-material.component';

describe('UpdateTeacherMaterialComponent', () => {
  let component: UpdateTeacherMaterialComponent;
  let fixture: ComponentFixture<UpdateTeacherMaterialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateTeacherMaterialComponent]
    });
    fixture = TestBed.createComponent(UpdateTeacherMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
