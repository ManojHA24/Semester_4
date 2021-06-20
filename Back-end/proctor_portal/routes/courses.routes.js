module.exports = app => {
    const courses = require('../controllers/courses.controller')

    app.get("/courses/:dept", courses.course)

} 