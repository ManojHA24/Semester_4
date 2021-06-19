const express = require('express')
const mysql = require('mysql')

const app = express();


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'jEev@2019',
    database: 'proctor_portal'
})
connection.connect();
var id = "12344"
var role = "student"
var sql = `select c.course_id, c.course_name, c.credits, c.course_semester, c.course_department, m.m_course_id, m.cie1, m.cie2, m.cie3, m.lab, m.internal, m.see from student s, marks m, courses c where s.g_id = "108960148661406427027" and s.usn = m.m_usn and m.m_course_id = c.course_id;`

var query = connection.query(sql, function(err, result){
    if(err) console.log(err)
    console.log(query.sql);
    console.log(result)
})