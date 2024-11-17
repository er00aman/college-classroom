import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DepartmentComponent } from './department/department.component';
import { CourseComponent } from './course/course.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './student/student.component';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { TeacherMeterialComponent } from './teacher-meterial/teacher-meterial.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { TeacherAssignmentComponent } from './teacher-assignment/teacher-assignment.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { TeacherRegisterComponent } from './teacher-register/teacher-register.component';
import { TeacherForgotAccountComponent } from './teacher-forgot-account/teacher-forgot-account.component';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { AssignmentUploadComponent } from './assignment-upload/assignment-upload.component';
import { ManageDepartmentComponent } from './manage-department/manage-department.component';
import { ManageCourseComponent } from './manage-course/manage-course.component';
import { ManageTeacherComponent } from './manage-teacher/manage-teacher.component';
import { ManageAssignementComponent } from './manage-assignement/manage-assignement.component';
import { ManageMaterialComponent } from './manage-material/manage-material.component';
import { ManageStudentComponent } from './manage-student/manage-student.component';
import { AdminForgetPasswordComponent } from './admin-forget-password/admin-forget-password.component';
import { StudentForgetPasswordComponent } from './student-forget-password/student-forget-password.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateDepartmentComponent } from './update-department/update-department.component';
import { UpdateCourseComponent } from './update-course/update-course.component';
import { UpdateAddTeacherComponent } from './update-add-teacher/update-add-teacher.component';
import { UpdateAddStudentComponent } from './update-add-student/update-add-student.component';
import { UpdateTeacherMaterialComponent } from './update-teacher-material/update-teacher-material.component';
import { UpdateTeacherAssignmentComponent } from './update-teacher-assignment/update-teacher-assignment.component';
import { UpdateStudentAssignmentComponent } from './update-student-assignment/update-student-assignment.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";
import { HttpClientModule } from "@angular/common/http";
import { SemesterComponent } from './semester/semester.component';
import { ManageSemesterComponent } from './manage-semester/manage-semester.component';
import { UpdateSemesterComponent } from './update-semester/update-semester.component';
import { SubjectComponent } from './subject/subject.component';
import { ManagetSubjectComponent } from './managet-subject/managet-subject.component';
import { SubjectUpdateComponent } from './subject-update/subject-update.component';
// import { UpdateSubjectComponent } from './update-subject/update-subject.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    DepartmentComponent,
    CourseComponent,
    TeacherComponent,
    StudentComponent,
    TeacherLoginComponent,
    TeacherMeterialComponent,
    StudentLoginComponent,
    TeacherAssignmentComponent,
    AddSubjectComponent,
    TeacherRegisterComponent,
    TeacherForgotAccountComponent,
    StudentRegisterComponent,
    AssignmentUploadComponent,
    ManageDepartmentComponent,
    ManageCourseComponent,
    ManageTeacherComponent,
    ManageAssignementComponent,
    ManageMaterialComponent,
    ManageStudentComponent,
    AdminForgetPasswordComponent,
    StudentForgetPasswordComponent,
    UpdateDepartmentComponent,
    UpdateCourseComponent,
    UpdateAddTeacherComponent,
    UpdateAddStudentComponent,
    UpdateTeacherMaterialComponent,
    UpdateTeacherAssignmentComponent,
    UpdateStudentAssignmentComponent,
    SemesterComponent,
    ManageSemesterComponent,
    UpdateSemesterComponent,
    SubjectComponent,
    ManagetSubjectComponent,
    SubjectUpdateComponent
    // UpdateSubjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NgxSpinnerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
