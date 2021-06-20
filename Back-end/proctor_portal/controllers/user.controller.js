const User = require("../models/user")

exports.create = (req, res) => {
    if(req.body.gid === "" && req.body.role === "")
        res.status(404).send({
            message:"Cannot sent empty request!"
        })
    
    const user = new User({
        gid: req.body.gid,
        role:req.body.role,
        profile: req.body.profile,
        details: req.body.details
        
        // {
        //     name:req.body.name,
        //     dob:req.body.dob,
        //     proctor:req.body.proctor,
        //     email:req.body.email,
        //     semester: req.body.semester,
        //     mobile_no: req.body.mobile_no,
        //     proctor_id:0,
        //     batch: req.body.batch,
        //     usn: req.body.usn,
        //     department: req.body.department,
        //     section: req.body.section,
        //     marks: req.body.marks
        // }


    })
    User.create(user, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occured while creating user"
            })
        else res.send(data)
    })
}



exports.findUser = (req, res) => {
    User.findUser(req.params.gid, (err, data) => {
        if (err){        
            if(err.type === "not_found")
                res.status(404).send({
                    message: `Not found user`
                })
            else
                res.status(500).send({
                    message: `Some error in retriving user`
                })
            return
        }
        res.send(data)
    })
}
