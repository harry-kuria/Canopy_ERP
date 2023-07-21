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
    destination: './uploads/', // Specify the directory where the file should be stored
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Define the filename
    }
  });

const upload = multer({storage: storage });

//add doctor to database
router.post('/mileageclaim',upload.single('pdf'), (req, res, next)=> {

    //const myid = seconds;
    const carnumber = req.body.carnumber;
    const carengine = req.body.carengine;
    const taskdone = req.body.taskdone;
    const distancecovered = req.body.distancecovered;
    const totalcost = req.body.totalcost;
    const file = `http://localhost:4500/${req.file.originalname}`;
    
    
    const sqlInsert = 'INSERT INTO canopy_mileage (carnumber, carengine, taskdone, distancecovered, totalcost, file) VALUES (?,?,?,?,?,?);';
    pool.query(sqlInsert,[ carnumber,carengine,taskdone, distancecovered, totalcost, file], (error, results) =>{
        if (error) { 
          console.error(error);
          res.status(500).json({
              message: "Error occurred while inserting to database",
              error: error.message
          });
          }
          else {

          res.status(200).json({
            
            message: "Successful insertion to database",
           
        })
      }

       // res.send(results.rows);
    console.log(results);
          
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

    const sqlSelect = "SELECT * FROM doctors"; 
    pool.query(sqlSelect, (error, result)=>{
        res.send(result);

        
        
    })
    
});
router.post('/load_profile_photo',(req, res, next)=> {
  const email = req.body.email;
  const sqlSelect = "SELECT photourl FROM doctors WHERE email=?"; 
  pool.query(sqlSelect,[email], (error, result)=>{
      res.send(result[0]);
      console.log(email);
      
  })
  
});
//edit profilePhoto
router.post('/update_photo',upload.single('photoURL'),(req,res, next)=> {
  const email = req.body.email;
  const photoURL = `http://192.168.43.191:5000/${req.file.path}`;

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


router.get('/:doctorId', (req, res, next) => {
  const doctorId = req.params.doctorId;
  const query = 'SELECT * FROM doctors WHERE id = ?';

  pool.query(query, [doctorId], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: 'Error retrieving doctor details from database'
      });
    } else if (results.length === 0) {
      res.status(404).json({
        message: 'Doctor not found'
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
  pool.query('SELECT COUNT(*) as count FROM doctors', (error, results) => {
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
    'UPDATE doctors SET approved = ? WHERE id = ?',
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


//edit doctor details
router.patch('/:doctorId',(req, res, next)=>{
    res.status(200).json({
        message: 'Edit a doctors details using PATCH',
        id: req.params.doctorId
    });
});
router.delete('/:doctorId', (req, res, next) => {
  const sql = `DELETE FROM doctors WHERE id = ${req.params.doctorId}`;
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