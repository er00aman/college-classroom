const router = require('express').Router()
const seeder = require('../api/seeder.js/seederController.js')
const department = require('../api/department/departmentController')
const course = require('../api/course/courseController')
const teacher = require('../api/teacher/teacherController')
const student = require('../api/student/studentController.js')
const teacherRegister = require('../api/teacherRegister/teacherRegisterController.js')
const semester = require('../api/semester/semesterController.js')
const subject = require('../api/subject/subjectController.js')
const teacherMaterial = require('../api/teacherUploadMaterial/teacherUploadMaterialController')
const teacherAssignment = require('../api/treacherAssignment/teacherAssignmentController')
const studentAssignment = require('../api/studentAssignment/studentAssignmentController.js')
const adminController = require('../api/adminLogin/loginController.js')
const multer = require('multer')


// <<< === seeder === >>>
router.post('/admin/seeder',seeder.seeder)
router.post('/admin/login',adminController.Login)
router.post('/admin/register',adminController.AdminRegister)
router.post('/loginTeacher',teacher.loginTeacher)
router.post('/teacherRegister',teacherRegister.teacherRegisterController)
router.post('/studentLogin',student.studentLogin)
router.post('/student',student.studentController)


router.use(require('../config/middlewere'))

// <<< === department api === >>>
router.post('/department/add',department.departmentController)
router.post('/department/GetAll',department.getAll)
router.post('/department/GetSingle',department.getSingle)
router.post('/department/Update',department.updateDepartment)
router.post('/department/delete',department.deleteDepartment)
router.post('/department/Block',department.departmentBlock)

// <<< === course api === >>>
router.post('/course',course.courseController)
router.post('/courseGetAll',course.getAll)
router.post('/course/GetSingle',course.getSingle),
router.post('/courseUpdate',course.courseUpdate)
router.post('/courseDelete',course.courseDelete)
router.post('/courseBlock',course.blockCourse)


// <<< === subject api === >>>
router.post('/subject',subject.subjectController)
router.post('/subjectGetAll',subject.getAll)
router.post('/subjectGetSingle',subject.getSingle)
router.post('/subjectUpdate',subject.subjectUpdate),
router.post('/subjectDelete',subject.subjectDelete)
router.post('/subjectBlock',subject.subjectBlock)

// <<< === semester api === >>>
router.post('/semester',semester.semesterController)
router.post('/semesterGetAll',semester.getAll)
router.post('/semesterGetSingle',semester.getSingle)
router.post('/semesterUpdate',semester.semesterUpdate)
router.post('/semesterFilter',semester.filter)
router.post('/semesterBlock',semester.semesterBlock)

// <<< === teacher api === >>>
router.post('/teacherRegisterGetAll',teacherRegister.getAll)
router.post('/teacherRegisterGetSingle',teacherRegister.getSingle)
router.post('/teacherRegisterUpdate',teacherRegister.teacherRegisterUpdate)
router.post('/teacherRegisterDelete',teacherRegister.teacherRegisterDelete)


router.post('/teacher',teacher.teacherController)
router.post('/teacherGetAll',teacher.getAll)
router.post('/getSingle',teacher.getSingle)
router.post('/teacherDelete',teacher.teacherDelete)
router.post('/teacherBlock',teacher.teacherBlock)
router.post('/teacherUpdate',teacher.teacherUpdate)


// <<< === material api === >>>
const materialStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './server/public/teacherMaterial')
    },
    filename: function (req, file, cb) {

      // console.log(file)

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const newname = file.fieldname + '-' + uniqueSuffix+file.originalname
      cb(null, newname)   
    }
  })

const materialUpload = multer({ storage: materialStorage })

router.post('/teacherMaterial',materialUpload.single('material'),teacherMaterial.teacherUploadController)
router.post('/teacherMaterialGetAll',teacherMaterial.getAll)
router.post('/teacherMaterialGetSingle',teacherMaterial.getSingle)
router.post('/teacherUploadUpdate',teacherMaterial.teacherUploadUpdate)
router.post('/deleteMaterial',teacherMaterial.deleteMaterial)
  
// <<< === assignment api === >>>
const assignmentStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './server/public/teacherAssignment')
  },
  filename: function (req, file, cb) {
    // console.log(file)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const newname = file.fieldname + '-' + uniqueSuffix+file.originalname
    cb(null, newname)   
  }
})

const assignmentUpload = multer({ storage: assignmentStorage })

router.post('/teacherAssignment',assignmentUpload.single('file'),teacherAssignment.teacherAssignmentController)
router.post('/AssignmentGetAll',teacherAssignment.getAll)
router.post('/AssignmentGetSingle',teacherAssignment.getSingle)
router.post('/AssignmentUpdate',assignmentUpload.single('file'),teacherAssignment.teacherAssignmentUpdate)
router.post('/teacherAssignmentDelete',teacherAssignment.teacherAssignmentDelete)


// <<< === student assignment api === >>>
const studentAssignmentMulter = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './server/public/studentAssignment')
  },
  filename: function (req, file, cb) {
    // console.log(file)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const newname = file.fieldname + '-' + uniqueSuffix+file.originalname
    cb(null, newname)   
  }
})

const studentAssignmentUpload = multer({ storage: studentAssignmentMulter })

router.post('/studentAssignment',studentAssignmentUpload.single('studentAssignment'),studentAssignment.studentAssignmentController)
router.post('/studentAssignmentGetAll',studentAssignment.getAll)
router.post('/studentAssignmentGetSingle',studentAssignment.getSingle)
router.post('/studentAssignmentUpdate',studentAssignment.studentAssignmentUpdate)
router.post('/studentAssignmentDelete',studentAssignment.studentAssignmentDelete)

// <<< === student api === >>>
router.post('/getAll',student.getAll)
router.post('/studentGetSingle',student.getSingle)
router.post('/studentUpdate',student.studentUpdate)
router.post('/studentDelete',student.studentDelete)
router.post('/studentBlock',student.studentBlock)


module.exports = router