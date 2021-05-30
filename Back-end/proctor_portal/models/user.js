const sql = require('./db')

const User = function(user){
    this.gid = user.gid
    this.role = user.role
    this.name = user.name
    this.email = user.email
    this.dob = user.dob
    this.mobile_no = user.mobile_no
    this.department = user.department
    this.batch = user.batch
    this.section = user.section
    this.semester = user.semester
    this.usn = user.usn
    this.proctor = user.proctor
    this.proctor_id = user.proctor_id
    this.message=user.message
    this.marks = user.marks
}

User.create = (newUser, result) => {
    var query = sql.query(`insert into login values("${newUser.gid}", "${newUser.role}");`, (err, res) => {
        if (err) {
            console.log(err)
            result(err, null)
            return
        }
        var p_id = 10
        var proctor_query = sql.query(`select p_id from proctor where name = "${newUser.proctor}";`, (err, res) => {
            if(err) console.log(err)
            p_id = res[0].p_id
        
        var student_query = sql.query(`insert into student values("${newUser.gid}", "${newUser.name}", "${newUser.usn}" , "${newUser.department}", "${newUser.email}" , "${newUser.mobile_no}","${newUser.dob}", "${p_id}", ${newUser.semester}, "${newUser.section}" , "${newUser.batch}");`, (err, res)=> {
            if(err) {
                console.log(err)
                var delete_login = sql.query(`delete from login where g_id=${newUser.gid};`, (err, res) => {
                    if(err){
                        console.log(err, "Failed to delete values of non-existing user")
                        result(err, null)
                    }
                console.log("Delete user:", delete_login.sql)
                result(err, null)
                })
            }
        })
        
        console.log("Created user", query.sql)
        console.log("Inserted into student: ",student_query.sql)
        })
        result(null, {gid: res.insertg_id, ...newUser})
    })
}



User.findUser = (gid, result) => {
    var select_student_query = sql.query(`select * from student s, proctor p where s.g_id = "${gid}" and s.proctor_id = p.p_id;`, (err, res) => {
        console.log("Haha")
        if(err) {
            console.log(err)
            result(err, null)
            return;
        }
        if(res.length){
            console.log("User Found!", res[0])
            console.log(select_student_query.sql)
            value = res[0]
            value.message = "User found"
            var marks_query = sql.query(`select * from marks where m_usn = "${value.usn}";`, (err, res) => {
                if(err) console.log(err)
                if (res.length){
                    console.log("Marks retrived", marks_query.sql)
                    value.marks = res
                    result(null, value)
                }
                console.log(res)
            })
            return;
        }

        result({kind:"not_found"}, null)
        console.log("No such user")
    })
}


module.exports = User