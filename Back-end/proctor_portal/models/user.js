const sql = require('./db')

const User = function(user){
    this.gid = user.gid
    this.role = user.role
    this.profile = user.profile
    this.details = user.details
}

User.create = (newUser, result) => {
    console.log(newUser)
    var query = sql.query(`insert into login values("${newUser.gid}", "${newUser.role}");`, (err, res) => {
        if (err) {
            console.log(err)
            result(err, null)
            return
        }
        var p_id = 10
        var proctor_query = sql.query(`select p_id from proctor where p_name = "${newUser.profile.proctor}";`, (err, res) => {
            if(err) console.log(err)
            p_id = res[0].p_id
        
        var student_query = sql.query(`insert into student values("${newUser.gid}", "${newUser.profile.name}", "${newUser.profile.usn}" , "${newUser.profile.department}", "${newUser.profile.email}" , "${newUser.profile.mobile_no}","${newUser.profile.dob}", "${p_id}", ${newUser.profile.semester}, "${newUser.profile.section}" , "${newUser.profile.batch}");`, (err, res)=> {
            if(err) {
                console.log(err)
                var delete_login = sql.query(`delete from login where g_id=${newUser.gid};`, (err, res) => {
                    if(err){
                        console.log(err, "Failed to delete values of non-existing user")
                        result(err, null)
                        return
                    }
                console.log("Delete user:", delete_login.sql)
                result(err, null)
                return
                })
            }
        })

        var details_query = sql.query(`insert into details values("${newUser.gid}", "${newUser.details.fName}", "${newUser.details.fOccu}", "${newUser.details.fPhno}", "${newUser.details.fEmail}", "${newUser.details.mName}", "${newUser.details.mOccu}", "${newUser.details.mPhno}", "${newUser.details.mEmail}" );`, (err, res) => {
            if(err){
                console.log("Error in entering details")
                result(err, null)
                return
            }
            console.log("Student Details Entered!", details_query.sql)            
        })
        console.log("Created user", query.sql)
        console.log("Inserted into student: ",student_query.sql)
        })
        result(null, {gid: res.insertg_id, ...newUser})
        return
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