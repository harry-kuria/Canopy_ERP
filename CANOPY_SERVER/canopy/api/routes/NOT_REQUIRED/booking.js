const express = require('express');

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
    database: 'afiagate',
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

const upload = multer({storage: storage });

//add doctor to database
router.post('/new_book', (req, res, next)=> {

    //const myid = seconds;
    const doctor_first_name = req.body.doctor_first_name;
    const doctor_last_name = req.body.doctor_last_name;
    const patient_first_name = req.body.patient_first_name;
    const patient_last_name = req.body.patient_last_name;
    const patient_contact = req.body.patient_contact;
    const doctor_email_address = req.body.doctor_email_address;
    const patient_email_address = req.body.patient_email_address;
    const patient_dob = req.body.patient_dob;
    const patient_booking_type = req.body.patient_booking_type;
    const booking_date_slot = req.body.booking_date_slot;
    const booking_time_slot = req.body.booking_time_slot;
    
    const sqlInsert = 'INSERT INTO bookings (doctor_first_name, doctor_last_name,patient_first_name,patient_last_name,patient_contact,doctor_email_address,patient_email_address,patient_dob,patient_booking_type,booking_date_slot,booking_time_slot) VALUES (?,?,?,?,?,?,?,?,?,?,?);';
    pool.query(sqlInsert,[ doctor_first_name,doctor_last_name,patient_first_name,patient_last_name,patient_contact,doctor_email_address,patient_email_address,patient_dob,patient_booking_type,booking_date_slot,booking_time_slot], (error, results) =>{
        if (error) { 
            throw error
          }
          
          
          res.status(200).json({
            
            message: "Successful insertion to database",
            
            //photoURL: photoURL
            
        })
       // res.send(results.rows);
    console.log(results);
          
    });
    
    
});

//add pay later new book
router.post('/payLater_book', (req, res, next)=> {

    //const myid = seconds;
    const doctor_email = req.body.doctor_email;
    const patient_full_name = req.body.patient_full_name;
    const patient_contact = req.body.patient_contact;
    const id_number = req.body.id_number;
    
    
    const sqlInsert = 'INSERT INTO payLater_book (doctor_email, patient_full_name,patient_contact,id_number) VALUES (?,?,?,?);';
    pool.query(sqlInsert,[ doctor_email,patient_full_name,patient_contact,id_number], (error, results) =>{
        if (error) { 
            throw error
          }
          
          
          res.status(200).json({
            
            message: "Successful insertion to database",
            
            //photoURL: photoURL
            
        })
       // res.send(results.rows);
    console.log(results);
          
    });
    
    
});




//add doctor to database
router.post('/', (req, res, next)=> {

    //const myid = seconds;
    const doctor_email_address = req.body.doctor_email_address;
    const booking_date_slot = req.body.booking_date_slot;
    const booking_time_slot = req.body.booking_time_slot;
    
    const sqlInsert = 'INSERT INTO bookingSlot (doctor_email_address,booking_date_slot,booking_time_slot) VALUES (?,?,?);';
    pool.query(sqlInsert,[ doctor_email_address,booking_date_slot,booking_time_slot], (error, results) =>{
        if (error) { 
            throw error
          }
          
          
          res.status(200).json({
            
            message: "Successful insertion to database",
            
            //photoURL: photoURL
            
        })
       // res.send(results.rows);
    console.log(results);
    console.log(doctor_email_address)
          
    });
    
    
});

router.post('/login', (req, res, next)=>{

    const sqlcheck = 'SELECT * FROM doctors WHERE email=? AND password=?';
  
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

//get all doctors
router.get('/',(req, res, next)=> {

    const sqlSelect = "SELECT * FROM bookings"; 
    pool.query(sqlSelect, (error, result)=>{
        res.send(result);
    })
    
});

//edit profilePhoto
router.put('/doctors',upload.single('photoURL'),(req,res, next)=> {
  const email = req.body.email;
  const photoURL = `http://192.168.2.119:5000/${req.file.path}`;

  const sql = 'UPDATE doctors SET photourl=? WHERE email = ?';
  pool.query(sql,[photoURL, email], (error, result)=>{
    res.send(result);
})
});

//edit date and time
router.post('/date_time',(req,res, next)=> {
  const date = req.body.date;
  const time = req.body.time;
  const email = req.body.email
  
  const sql = 'UPDATE doctors SET date=?, time=? WHERE email = ?';
  pool.query(sql,[date,time,email], (error, result)=>{
    
 // res.send(results.rows);
console.log(date);
res.send(result);
})
});

router.post('/add_academics',(req,res, next)=> {
  const academics = req.body.academics;
  const email = req.body.email
  
  const sql = 'UPDATE doctors SET academics=? WHERE email = ?';
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
  
  const sql = 'SELECT date,time FROM doctors WHERE email = ?';
  pool.query(sql,[email], (error, result)=>{
    
 // res.send(results.rows);
console.log(date);
res.send(result);
})
});

router.post('/read_bio',(req,res, next)=> {
  const bio = req.body.bio;
  const email = req.body.email
  
  const sql = 'SELECT bio FROM doctors WHERE email = ?';
  pool.query(sql,[email], (error, result)=>{
    
 // res.send(results.rows);
console.log(bio);
res.send(result);
})
});

router.post('/read_academics',(req,res, next)=> {
  const academics = req.body.academics;
  const email = req.body.email
  
  const sql = 'SELECT academics FROM doctors WHERE email = ?';
  pool.query(sql,[email], (error, result)=>{
    
 // res.send(results.rows);
console.log(academics);
res.send(result);
})
});

router.post('/read_professional',(req,res, next)=> {
  const professional = req.body.professional;
  const email = req.body.email
  
  const sql = 'SELECT professional FROM doctors WHERE email = ?';
  pool.query(sql,[email], (error, result)=>{
    
 // res.send(results.rows);
console.log(professional);
res.send(result);
})
});

router.post('/read_certification',(req,res, next)=> {
  const certification = req.body.certification;
  const email = req.body.email
  
  const sql = 'SELECT certification FROM doctors WHERE email = ?';
  pool.query(sql,[email], (error, result)=>{
    
 // res.send(results.rows);
console.log(certification);
res.send(result);
})
});

router.post('/add_professional',(req,res, next)=> {
  const professional = req.body.professional;
  const email = req.body.email
  
  const sql = 'UPDATE doctors SET professional=? WHERE email = ?';
  pool.query(sql,[professional,email], (error, result)=>{
    
 // res.send(results.rows);
console.log(professional);
res.send(result);
})
});

router.post('/add_certification',(req,res, next)=> {
  const certification = req.body.certification;
  const email = req.body.email
  
  const sql = 'UPDATE doctors SET certification=? WHERE email = ?';
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
  
  const sql = 'UPDATE doctors SET bio=? WHERE email = ?';
  pool.query(sql,[bio,email], (error, result)=>{
    
 // res.send(results.rows);
console.log(bio);
res.send(result);
})
});


router.get('/:doctorEmail', (req, res, next) => {
  const doctorEmail = req.params.doctorEmail;
  const query = 'SELECT booking_date_slot,booking_time_slot FROM bookings WHERE doctor_email_address = ?';

  pool.query(query, [doctorEmail], (err, results) => {
    
    const doctor = results;

    res.send(doctor)
  });
});


router.post('/slots', (req, res, next) => {
  const doctor_email_address = req.body.doctor_email_address;
  const query = 'SELECT * FROM bookingSlot WHERE doctor_email_address = ?';

  pool.query(query, [doctor_email_address], (err, results) => {
    
    const doctor = results;

    res.send(doctor)
    console.log(doctor_email_address)
  });
});

//edit doctor details
router.patch('/:doctorId',(req, res, next)=>{
    res.status(200).json({
        message: 'Edit a doctors details using PATCH',
        id: req.params.doctorId
    });
});
//delete doctor
router.delete('/:doctorId',(req, res, next)=>{
    res.status(200).json({
        message: 'doctor deleted using DELETE',
        id: req.params.doctorId
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