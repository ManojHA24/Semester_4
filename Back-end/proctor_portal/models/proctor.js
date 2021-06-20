const sql = require('./db')

const Proctor = (p_id)=> {
    console.log(p_id)
}

Proctor.profile = (pid, result) => {
    var proc_prof = sql.query(`select * from proctor where p_id = "${pid}";`, (err, res)=> {
        if(err){
            console.log("Error in get proc profile")
            result(err, null)
            return
        }
        if(res.length){
            console.log("Proctor Found!", proc_prof.sql)
            result(null, res[0])
            return
        }
        console.log(res, "No Proctor found", proc_prof.sql)
        result(null, {message: "No proctor found"})
        return
    })
}


Proctor.students = (pid, result) => {
    var proc_students = sql.query(`select * from student where proctor_id = "${pid}";`, (err, res)=> {
        if (err){
            console.log("Error in getting students")
            result(err, null)
            return
        }
        if(res.length){
            console.log("Students Found", proc_students.sql)
            result(null, res)
            return
        }
        console.log("No students found", proc_students.sql)
        result(null, {message: "No students found"})
    })
}


module.exports = Proctor