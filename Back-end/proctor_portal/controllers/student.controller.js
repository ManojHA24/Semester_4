const Student = require("../models/student")

exports.profiles = (req, res) => {
    Student.get_profile(req.params.gid, (err, data) => {
        if(err){
            res.status(500).send({
                message: "Some error"
            })
            return
        }
        res.send(data)
    })
}


exports.grades = (req, res) => {
    Student.get_grades(req.params.gid, (err, data) => {
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


exports.proc = (req, res) => {
    Student.get_proc(req.params.gid, (err, data) => {
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


exports.details = (req, res) => {
    Student.get_details(req.params.gid, (err, data) => {
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


exports.student = (req, res) => {
    Student.get_student(req.params.gid, (err, data) => {
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