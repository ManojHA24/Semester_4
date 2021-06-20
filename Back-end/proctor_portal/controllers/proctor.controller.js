const Proctor = require("../models/proctor")

exports.profile = (req, res) => {
    Proctor.profile(req.params.pid, (err, data)=> {
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

exports.students = (req, res) => {
    Proctor.students(req.params.pid,(err, data)=> {
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