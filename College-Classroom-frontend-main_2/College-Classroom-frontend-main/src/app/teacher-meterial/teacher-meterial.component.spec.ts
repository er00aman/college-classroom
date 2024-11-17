import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherMeterialComponent } from './teacher-meterial.component';

describe('TeacherMeterialComponent', () => {
  let component: TeacherMeterialComponent;
  let fixture: ComponentFixture<TeacherMeterialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherMeterialComponent]
    });
    fixture = TestBed.createComponent(TeacherMeterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
