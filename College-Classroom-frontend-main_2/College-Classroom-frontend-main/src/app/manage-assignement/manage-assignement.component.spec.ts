import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAssignementComponent } from './manage-assignement.component';

describe('ManageAssignementComponent', () => {
  let component: ManageAssignementComponent;
  let fixture: ComponentFixture<ManageAssignementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageAssignementComponent]
    });
    fixture = TestBed.createComponent(ManageAssignementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
