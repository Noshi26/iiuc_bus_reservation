const express=require('express');
const app=express();
const port=3000;
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "nowshin",
    password: "1234567"
  });

app.post("/",(req,res)=>{
    res.send("hello world");
});



app.listen(port, ()=>{
    console.log("Listening to port 3000")
});