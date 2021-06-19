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
            console.log("Student proctor Found!")
            result(null, res[0])
            return
        }
        console.log("No proctor found!")
        result(null, {message: "Proctor Not Found!"})
        return
    })
}

module.exports = Student
