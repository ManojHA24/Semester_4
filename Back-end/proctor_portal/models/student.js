const sql = require('./db')


const Student =function(student) {
    this.gid = student.gid,
    this.role= "Student",
    this.profile = student.profile
}

Student.get_profile = (gid, result) => {
    const get_student = sql.query(`select * from student where g_id = "${gid}";`, (err, res) => {
        if(err){
            console.log(err)
            result(err, null)
            return
        }
        if(res.length){
            console.log("Student Found: ", res[0])
            result(null, res[0])
            return
        }
    })
}


Student.get_proc = (gid, result) => {
    const get_proc_query = sql.query(`select p.p_name, p.p_email, p.p_mobile_no from student s, proctor p where s.g_id = "${gid}" and s.proctor_id = p.p_id;`, (err, res) => {
        if (err) {
            console.log("Error!!")
            result(err, null)
            return
        }
        if(res.length){
            console.log(get_proc_query.sql)
            console.log("Student proctor Found!")
            result(null, res[0])
            return
        }
        console.log(get_proc_query.sql)
        console.log("No proctor found!")
        result(null, {message: "Proctor Not Found!"})
        return
    })
}


Student.get_grades = (gid, result) => {
    const get_grades_query = sql.query(`select c.course_id, c.course_name, c.credits, c.course_semester, c.course_department, m.m_course_id, m.cie1, m.cie2, m.cie3, m.lab, m.internal, m.see from student s, marks m, courses c where s.g_id = "${gid}" and s.usn = m.m_usn and m.m_course_id = c.course_id;`, (err, res) => {
        if(err){
            console.log("Error")
            result(err, null)
            return
        }
        if(res.length){
            console.log(get_grades_query.sql)
            console.log(res)
            result(null, res)
            return
        }
        console.log("No grades found!")
        result(null, {message: "No grades found"})
    })
}

module.exports = Student
