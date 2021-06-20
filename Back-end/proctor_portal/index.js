const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const Port = 8000
const app = express()

app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true}))


app.get("/", (req, res) => {
    console.log("We on fire!")
    res.json({message: "We are on fire!"})
})

app.use(cors({
    origin:'http://localhost:3000',
}))

require("./routes/student.routes")(app)
require("./routes/user.routes")(app)
require("./routes/courses.routes")(app)
require("./routes/proctor.routes")(app)

app.listen(Port, console.log(`App listening on port ${Port}`))