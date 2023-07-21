const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const randomId = require('random-id');
const jwt=require('jsonwebtoken');
const bcrypt = require('bcrypt');

const mysql = require('mysql');
const pool = mysql.createConnection({     
    user: 'root',
    host: 'localhost',
    database: 'canopy',
    password: 'H@rri50nmysql'
  })


  const storage = multer.diskStorage({
    destination: "./doctorimages", /*(req, file,cb) => {
        cb(null, __dirname+'/images/')
    },*/
    filename: (req, file, cb) => {
        console.log(file);
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})

router.post('/login', (req, res, next)=>{

    const sqlcheck = 'SELECT * FROM canopy_users WHERE username=? AND password=?';
  
    pool.query(sqlcheck,[req.body.username, req.body.password], (err,results) =>{
      
      if (err) {
        console.log(err);
        res.status(500).send('There was an error logging in the user');
      }
      else {
        // If the user exists, compare the hashed password from the database with the password from the request
        var user = results[0];
        if (user){
          // If the passwords match, create a JWT
          var token = jwt.sign({ user: user }, "YesuNiWanguNiWaUzimaWaMileleNaAnafanyaMamboAmbayoMwanadamuHaweziKufanya", {
            expiresIn: 86400 // expires in 24 hours
          });
   
          // Return the JWT to the user
          res.status(200).send({ auth: true, token: token, username: user.username });
          
        }
        else {
           // If the user doesn't exist, return an error
           res.status(404).send(req.body.username);
           //res.send(req.body.username);
           console.log(req.body.username)
        }
      }
      
    })
  });

router.get('/',(req, res, next)=>{ 
  const sqlInsert = "SELECT * FROM canopy_users;"
  pool.query(sqlInsert, (error, results) =>{
    if (error) {
        throw error
      }
    res.send(results);
    console.log(results);
      
      
});
})

module.exports = router;
