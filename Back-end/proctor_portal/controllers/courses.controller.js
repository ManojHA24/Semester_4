const Courses = require('../models/courses')

exports.course = (req, res) => {
    Courses.get_courses(req.params.dept, (err, data) => {
        if(err){
            console.log(err)
            res.status(500).send({
                message: "error!"
            })
            return
        }
        res.send(data)
    })
}