const http = require('http');
const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const popup = require('popups');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engin', 'pug');
// app.get('/', (req, res) => res.send('index.html', {root: __dirname}));
app.get('/', function(request, res){
    res.sendfile('index.html');
});

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'test'
  });
  
connection.connect(function(err){
    if (err) throw err;
    console.log("connected");
});

app.post('/submit', function (req, res) {
    var sql = "INSERT INTO student_data ( studentName, studentMobileNo, studentAge, studentFatherName, studentFatherMobileNo, registrationDate, activeStatus ) VALUES ('" + req.body.studentName + "', '" + req.body.studentMobileNo + "', '" + req.body.studentAge + "', '" + req.body.studentFatherName + "', '" + req.body.studentFatherMobileNo + "', '" + req.body.registrationDate + "', 'Y')";
    connection.query(sql , function( err) {
        if (err) throw err
        console.log("Data Saved Successfully");
        res.sendfile('index.html');
    })
    connection.end();
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))