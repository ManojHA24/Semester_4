module.exports = app => {
    const user = require('../controllers/user.controller.js')
    
    app.post("/user", user.create )

    app.get("/user/:gid", user.findUser)

    // app.get("student/Proc/:gid")

    // app.get("student/grades/:usn")

    // agg.get("student/details/:gid")

    app.get("/:random", (req, res)=>{
        res.json({message: "123"})
    })

    app.post("/u")

} 