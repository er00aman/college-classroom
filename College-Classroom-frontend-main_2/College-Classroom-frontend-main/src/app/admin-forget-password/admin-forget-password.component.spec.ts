import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminForgetPasswordComponent } from './admin-forget-password.component';

describe('AdminForgetPasswordComponent', () => {
  let component: AdminForgetPasswordComponent;
  let fixture: ComponentFixture<AdminForgetPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminForgetPasswordComponent]
    });
    fixture = TestBed.createComponent(AdminForgetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
