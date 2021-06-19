module.exports = app => {
    const student = require('../controllers/student.controller')
    
    app.get("/student/profile/:gid", student.profile)

    app.get("/student/Proc/:gid", student.proc)

    app.get("/student/grades/:gid", student.grades)

    // agg.get("student/details/:gid")

} 