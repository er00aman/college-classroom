import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DepartmentComponent } from './department/department.component';
import { CourseComponent } from './course/course.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './student/student.component';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { TeacherMeterialComponent } from './teacher-meterial/teacher-meterial.component';
import { TeacherAssignmentComponent } from './teacher-assignment/teacher-assignment.component';
import { StudentLoginComponent } from './student-login/student-login.component';
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
import { UpdateDepartmentComponent } from './update-department/update-department.component';
import { UpdateCourseComponent } from './update-course/update-course.component';
import { UpdateAddTeacherComponent } from './update-add-teacher/update-add-teacher.component';
import { UpdateAddStudentComponent } from './update-add-student/update-add-student.component';
import { UpdateTeacherMaterialComponent } from './update-teacher-material/update-teacher-material.component';
import { UpdateTeacherAssignmentComponent } from './update-teacher-assignment/update-teacher-assignment.component';
import { UpdateStudentAssignmentComponent } from './update-student-assignment/update-student-assignment.component';
import { SemesterComponent } from './semester/semester.component';
import { ManageSemesterComponent } from './manage-semester/manage-semester.component';
import { UpdateSemesterComponent } from './update-semester/update-semester.component';
import { SubjectComponent } from './subject/subject.component';
import { ManagetSubjectComponent } from './managet-subject/managet-subject.component';
import { SubjectUpdateComponent } from './subject-update/subject-update.component';

const routes: Routes = [
  {
    path:'', redirectTo:'/layout/home',pathMatch:'full'
  },
  {
    path:'layout',component:LayoutComponent,
    children:[
      {
        path:'home',component:HomeComponent
      },
      {
        path:'admin-login',component:LoginComponent
      },
      {
        path:'department',component:DepartmentComponent
      },
      {
        path:'course',component:CourseComponent
      },
      {
        path:'semester',component:SemesterComponent
      },
      {
        path:'subject',component:SubjectComponent
      },
      {
        path:'add-teacher',component:TeacherComponent
      },
      {
        path:'add-student',component:StudentComponent
      },
      {
        path:'teacher-login',component:TeacherLoginComponent
      },
      {
        path:'teacher-material',component:TeacherMeterialComponent
      },
      {
        path:'teacher-assignment',component:TeacherAssignmentComponent
      },
      {
        path:'add-subject',component:AddSubjectComponent
      },
      {
        path:'teacher-register',component:TeacherRegisterComponent
      },
      {
        path:'teacher-forget-password',component:TeacherForgotAccountComponent
      },
      {
        path:'student-login',component:StudentLoginComponent
      },
      // {
      //   path:'student-register',component:StudentRegisterComponent
      // },
      {
        path:'student-assignment',component:AssignmentUploadComponent
      },
      {
        path:'manage-department',component:ManageDepartmentComponent
      },
      {
        path:'manage-course',component:ManageCourseComponent
      },
      {
        path:'manage-semester',component:ManageSemesterComponent
      },
      {
        path:'manage-subject',component:ManagetSubjectComponent
      },
      {
        path:'manage-teacher',component:ManageTeacherComponent
      },
      {
        path:'manage-assignment',component:ManageAssignementComponent
      },
      {
        path:'manage-material',component:ManageMaterialComponent
      },
      {
        path:'manage-student',component:ManageStudentComponent
      },
      {
        path:'admin-forget-password',component:AdminForgetPasswordComponent
      },
      {
        path:'student-forget-password',component:StudentForgetPasswordComponent
      },
      {
        path:'update-department/:_id',component:UpdateDepartmentComponent
      },
      {
        path:'update-course/:_id',component:UpdateCourseComponent
      },
      {
        path:'update-semester/:_id',component:UpdateSemesterComponent
      },
      {
        path:'update-subject/:_id',component:SubjectUpdateComponent
      },
      {
        path:'update-add-teacher/:_id',component:UpdateAddTeacherComponent
      },
      {
        path:'update-add-student/:_id',component:UpdateAddStudentComponent
      },
      {
        path:'update-teacher-material/:_id',component:UpdateTeacherMaterialComponent
      },
      {
        path:'update-teacher-assignment/:_id',component:UpdateTeacherAssignmentComponent
      },
      {
        path:'update-student-assignment/:_id',component:UpdateStudentAssignmentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
