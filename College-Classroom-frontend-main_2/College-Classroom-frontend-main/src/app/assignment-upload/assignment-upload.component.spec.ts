import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentUploadComponent } from './assignment-upload.component';

describe('AssignmentUploadComponent', () => {
  let component: AssignmentUploadComponent;
  let fixture: ComponentFixture<AssignmentUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignmentUploadComponent]
    });
    fixture = TestBed.createComponent(AssignmentUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
