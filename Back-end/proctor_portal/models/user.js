const sql = require('./db')

const User = function(user){
    
    this.gid = user.gid
    this.role = user.role
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
    var select_user = sql.query(`select * from login where login.g_id = "${gid}";`, (err, res)=> {
        if(err){
            console.log("There was an error getting user role", err)
            result(err, null)
            return
        }
        if(res.length){
            console.log("User found!", res[0])
            console.log(select_user.sql)
            result(null, res[0])
            return
        }
        else{
            console.log("User not found!")
            result({type : "not_found"}, null)
        }
    })
}


module.exports = User