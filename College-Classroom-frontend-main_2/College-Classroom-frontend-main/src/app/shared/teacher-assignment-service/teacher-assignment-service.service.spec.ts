import { TestBed } from '@angular/core/testing';

import { TeacherAssignmentServiceService } from './teacher-assignment-service.service';

describe('TeacherAssignmentServiceService', () => {
  let service: TeacherAssignmentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherAssignmentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
