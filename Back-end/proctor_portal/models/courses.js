const sql = require('./db')

const Courses = (gid)=> {
    console.log(gid)
}

Courses.get_courses = (dept, result) => {
    var courses = sql.query(`select * from courses where course_department = "${dept}";`, (err, res) => {
        if (err){
            console.log(err)
            result(err, null)
            return
        }
        if(res.length){
        console.log(res, courses.sql)
        result(null, res)
        return
        }
        console.log("No Courses found!!")
        result(null, "No Courses found!!")
        return
    })
}

module.exports = Courses