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
var sql = `select * from login where role = "Student"`;

var query = connection.query(sql, function(err, result){
    if(err) console.log(err)
    console.log(query.sql);
    console.log(result)
})