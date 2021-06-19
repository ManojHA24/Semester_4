module.exports = app => {
    const student = require('../controllers/student.controller')
    
    app.get("/student/profile/:gid", student.profiles)

    app.get("/student/proc/:gid", student.proc)

    app.get("/student/grades/:gid", student.grades)

    app.get("/student/details/:gid", student.details)

    // app.get("/student/:gid", student.student)

} 