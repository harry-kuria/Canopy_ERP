const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const multer = require('multer');
const path = require('path');
var jwt = require('jsonwebtoken');
const randomId = require('random-id');
const nodemailer = require('nodemailer');

const mysql = require('mysql');
const pool = mysql.createConnection({     
    user: 'root',
    host: 'localhost',
    database: 'afiagate',
    password: 'H@rri50nmysql'
  })


  const storage = multer.diskStorage({
    destination: "./nurseimages", /*(req, file,cb) => {
        cb(null, __dirname+'/images/')
    },*/
    filename: (req, file, cb) => {
        console.log(file);
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})

const upload = multer({storage: storage });

const seconds = new Date().getTime() / 1000;

var len = 30;
 
// pattern to determin how the id will be generated
// default is aA0 it has a chance for lowercased capitals and numbers
var pattern = 'aA0'
 
var customid = randomId(len, pattern)

//add nurse to database
router.post('/signup',upload.single('photoURL'), (req, res, next)=> {

    //const myid = seconds;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;
    const contact = req.body.contact;
    const speciality = req.body.speciality;
    //const photoURL = `http://192.168.2.119:5000/${req.file.path}`;
    const brief_speciality = req.body.brief_speciality;
    const verified = req.body.verified;
    const regnumber = req.body.regnumber;
    
    const sqlInsert = 'INSERT INTO nurse_assistants (first_name, last_name, email, password, contact, speciality, brief_speciality, verified, regnumber, photourl,academics,professional,certification,bio,insurance,approved) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
    pool.query(sqlInsert,[ first_name,last_name,email, password, contact, speciality,brief_speciality,verified,regnumber, "","","","","","","","" ], (error, results) =>{
        if (error) { 
            throw error
          }
          
          
          res.status(200).json({
            
            message: "Successful insertion to database",
            password: password,
            contact: contact,
            speciality: speciality,
            //photoURL: photoURL
            
        })

        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'afiagateteam@gmail.com',
              pass: 'ihoonkmrgnhakyjc'
          }
      });
      
      let mailOptions = {
          from: 'Afiagate Team <info@afiagate.com>',
          to: email,
          subject: 'Dear '+first_name+' '+last_name,
          text: 'I wanted to take a moment to welcome you to our medical booking platform! As a newly registered nurse assistant, we are excited to have you join our team of healthcare professionals who are dedicated to providing excellent care to patients across the region. Our platform offers a variety of tools and resources to help you manage your schedule, communicate with patients, and work more efficiently alongside other medical professionals. We believe that our platform can help you to achieve your professional goals, and we are committed to supporting you every step of the way. If you have any questions about our platform or how to use it effectively, please do not hesitate to reach out to our support team. We are here to help you get the most out of our platform and ensure that you have a positive experience.'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
          if (error) {
              console.log(error);
          } else {
            console.log('email sent:' )
              console.log('Email sent: ' + info.response);
              console.log('============================================================');
              console.log('Email sent from ' + info.from);
              console.log('Email sent to ' + info.to);
              console.log('Email subject: ' + info.subject);
              console.log('Email text: ' + info.text);
          }
      });
       // res.send(results.rows);
    console.log(results);
          
    });
    
    
});

router.post('/login', (req, res, next)=>{

    const sqlcheck = 'SELECT * FROM nurse_assistants WHERE email=? AND password=?';
  
    pool.query(sqlcheck,[req.body.email, req.body.password], (err,results) =>{
      
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
          res.status(200).send({ auth: true,  token: token });
        }
        else {
           // If the user doesn't exist, return an error
           res.status(404).send(req.body.username);
           //res.send(req.body.username);
           console.log(req.body.username)
        }
      }
      // if (results.rows[0]){
      //   return res.status(500).json({
      //     message: "Invalid credentials"
      //   })
        
      // }
      // else {
      //   return res.status(200).json({
      //     message: "Successful Login",
      //     error: err
      //   })
      //   console.log(req.body.username);
      // }
    })
  });


//get all nurses
router.get('/',(req, res, next)=> {

    const sqlSelect = "SELECT * FROM nurse_assistants"; 
    pool.query(sqlSelect, (error, result)=>{
        res.send(result);
    })
    
});

router.post('/load_profile_photo',(req, res, next)=> {
  const email = req.body.email;
  const sqlSelect = "SELECT photourl FROM nurse_assistants WHERE email=?"; 
  pool.query(sqlSelect,[email], (error, result)=>{
      res.send(result);
      console.log(result);
      
  })
  
});

//edit profilePhoto
router.put('/nurse',upload.single('photoURL'),(req,res, next)=> {
  const email = req.body.email;
  const photoURL = `http://192.168.2.119:5000/${req.file.path}`;

  const sql = 'UPDATE nurse_assistants SET photourl=? WHERE email = ?';
  pool.query(sql,[photoURL, email], (error, result)=>{
    res.send(result);
})
});

//edit date and time
router.post('/date_time',(req,res, next)=> {
  const date = req.body.date;
  const time = req.body.time;
  const email = req.body.email
  
  const sql = 'UPDATE nurse_assistants SET date=?, time=? WHERE email = ?';
  pool.query(sql,[date,time,email], (error, result)=>{
    
 // res.send(results.rows);
console.log(date);
res.send(result);
})
});

router.post('/add_academics',(req,res, next)=> {
  const academics = req.body.academics;
  const email = req.body.email
  
  const sql = 'UPDATE nurse_assistants SET academics=? WHERE email = ?';
  pool.query(sql,[academics,email], (error, result)=>{
    
 // res.send(results.rows);
console.log(academics);
res.send(result);
})
});

router.post('/read_date_time',(req,res, next)=> {
  const date = req.body.date;
  const time = req.body.time;
  const email = req.body.email
  
  const sql = 'SELECT date,time FROM nurse_assistants WHERE email = ?';
  pool.query(sql,[email], (error, result)=>{
    
 // res.send(results.rows);
console.log(date);
res.send(result);
})
});

router.post('/read_bio',(req,res, next)=> {
  const bio = req.body.bio;
  const email = req.body.email
  
  const sql = 'SELECT bio FROM nurse_assistants WHERE email = ?';
  pool.query(sql,[email], (error, result)=>{
    
 // res.send(results.rows);
console.log(bio);
res.send(result);
})
});

router.post('/read_academics',(req,res, next)=> {
  const academics = req.body.academics;
  const email = req.body.email
  
  const sql = 'SELECT academics FROM nurse_assistants WHERE email = ?';
  pool.query(sql,[email], (error, result)=>{
    
 // res.send(results.rows);
console.log(academics);
res.send(result);
})
});

router.post('/read_professional',(req,res, next)=> {
  const professional = req.body.professional;
  const email = req.body.email
  
  const sql = 'SELECT professional FROM nurse_assistants WHERE email = ?';
  pool.query(sql,[email], (error, result)=>{
    
 // res.send(results.rows);
console.log(professional);
res.send(result);
})
});

router.post('/read_certification',(req,res, next)=> {
  const certification = req.body.certification;
  const email = req.body.email
  
  const sql = 'SELECT certification FROM nurse_assistants WHERE email = ?';
  pool.query(sql,[email], (error, result)=>{
    
 // res.send(results.rows);
console.log(certification);
res.send(result);
})
});

router.post('/add_professional',(req,res, next)=> {
  const professional = req.body.professional;
  const email = req.body.email
  
  const sql = 'UPDATE nurse_assistants SET professional=? WHERE email = ?';
  pool.query(sql,[professional,email], (error, result)=>{
    
 // res.send(results.rows);
console.log(professional);
res.send(result);
})
});

router.post('/add_certification',(req,res, next)=> {
  const certification = req.body.certification;
  const email = req.body.email
  
  const sql = 'UPDATE nurse_assistants SET certification=? WHERE email = ?';
  pool.query(sql,[certification,email], (error, result)=>{
    
 // res.send(results.rows);
console.log(certification);
res.send(result);
})
});

//edit date and time
router.post('/add_bio',(req,res, next)=> {
  const bio = req.body.bio;
  const email = req.body.email
  
  const sql = 'UPDATE nurse_assistants SET bio=? WHERE email = ?';
  pool.query(sql,[bio,email], (error, result)=>{
    
 // res.send(results.rows);
console.log(bio);
res.send(result);
})
});

//get a doctor by ID
router.get('/:nurse_assistantsId', (req, res, next) => {
  const nurse_assistantsId = req.params.nurse_assistantsId;
  const query = 'SELECT * FROM nurse_assistants WHERE id = ?';

  pool.query(query, [nurse_assistantsId], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: 'Error retrieving nurse details from database'
      });
    } else if (results.length === 0) {
      res.status(404).json({
        message: 'Nurse not found'
      });
    } else {
      
      // res.status(200).json({
      //   doctor
      //   // Add any other fields you want to return here
      // });
    }
    const doctor = results;

    res.send(doctor)
  });
});
router.get('/items/count', (req, res) => {
  pool.query('SELECT COUNT(*) as count FROM nurse_assistants', (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving items count' });
    } else {
      const count = results[0].count;
      res.status(200).json({ count: count });
    }
  });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const approval = req.body.approved;

  pool.query(
    'UPDATE nurse_assistants SET approved = ? WHERE id = ?',
    [approval, id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error updating doctor approval status');
      } else {
        console.log(`Doctor ${id} approval status updated to ${approval}`);
        res.send(`Doctor ${id} approval status updated to ${approval}`);
      }
    }
  );
});

//edit booking details
router.put('/nurse',(req,res, next)=> {
    const time = req.body.time;
    const charges = req.body.charges;
    const booking = req.body.booking;
    const sql = 'UPDATE nurse_assistants SET time=?, charges=? WHERE booking = ?';
    pool.query(sql,[time,charges,booking], (error, result)=>{
      res.send(result.rows);
  })
  });


//edit doctor details
router.patch('/:nurseId',(req, res, next)=>{
    res.status(200).json({
        message: 'Edit a nurse details using PATCH',
        id: req.params.doctorId
    });
});


//delete doctor
router.delete('/:doctorId', (req, res, next) => {
  const sql = `DELETE FROM nurse_assistants WHERE id = ${req.params.doctorId}`;
  pool.query(sql, (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).json({
        error: error
      });
    } else {
      res.status(200).json({
        message: 'doctor deleted using DELETE',
        id: req.params.doctorId
      });
    }
  });
});
 
module.exports=router;



/////////////////////////////////////////TEST////////////////////////////////////////////////////////
// const express = require('express');
// const bcrypt = require('bcrypt');
// const multer = require('multer');
// const router = express.Router();
// const Pool = require('pg').Pool
// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'afiagate',
//     password: 'H@rri50n',
//     port: 5432
//   })

//     const storage = multer.diskStorage({
//     destination: "./doctorimages", /*(req, file,cb) => {
//         cb(null, __dirname+'/images/')
//     },*/
//     filename: (req, file, cb) => {
//         console.log(file);
//         return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
//     }
// })

// const upload = multer({storage: storage });

// const seconds = new Date().getTime() / 1000;

// var len = 30;
 
// // pattern to determin how the id will be generated
// // default is aA0 it has a chance for lowercased capitals and numbers



// router.post('/', upload.single('photoURL'), (req, res, next)=>{

// // const  data  = pool.query(`SELECT * FROM users WHERE contact= $1;`, [req.body.contact]); //Checking if user already exists
// // const  arr  =  data.rows;  
// // if (arr.length  !=  0) {
// // return  res.status(400).json({
// // error: "This contact is already registered.",
// // });
// // } 
// // else 
// {bcrypt.hash(req.body.password,10,(err, hash) => {
//   if (err){

//     return res.status(500).json({
//       error: err
//     });
//   }

//   else {
//     const username = req.body.username;
//     const password = hash;
//     const contact = req.body.contact;
//     const speciality = req.body.speciality; 
//     const photoURL = `http://localhost:5000/${req.file.path}`;
//     const sqlInsert = 'INSERT INTO doctors (username, password, contact, speciality,photourl) VALUES ($1, $2, $3, $4, $5);';
//     pool.query( sqlInsert,[username, password, contact, speciality,photoURL], (error, results) =>{ 
//         if (error) {
//             throw error
//           }
//           res.send(results.rows);
//           console.log(results.rows);      
//     });
//     console.log(password);

//   }
// });
// }
   
  
//     //const {username, password, contact, speciality} = req.body;
  
// });

// router.get('/',(req, res, next)=>{ 
//   const sqlInsert = "SELECT * FROM doctors;"
//   pool.query(sqlInsert, (error, results) =>{
//     if (error) {
//         throw error
//       }
//     res.send(results.rows);
//     console.log(results.rows);
      
      
// });
// })

// module.exports = router;