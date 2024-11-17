import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagetSubjectComponent } from './managet-subject.component';

describe('ManagetSubjectComponent', () => {
  let component: ManagetSubjectComponent;
  let fixture: ComponentFixture<ManagetSubjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagetSubjectComponent]
    });
    fixture = TestBed.createComponent(ManagetSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
