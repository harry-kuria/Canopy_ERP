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

  //create a canopy user
  router.post('/new_user', (req, res, next)=> {

    
    const username = req.body.username;
    const password = req.body.password;
    
    const sqlInsert = 'INSERT INTO canopy_users (username, password) VALUES (?,?);';
    pool.query(sqlInsert,[ username,password], (error, results) =>{
        if (error) { 
            throw error
          }
          
          
          res.status(200).json({
            
            message: "Successful user data insertion to database",
            
            
            
        })
       // res.send(results.rows);
    console.log(results);
          
    });
    
    
});

//read all canopy users
router.get('/canopy_users',(req, res, next)=>{ 
    const sqlInsert = "SELECT * FROM canopy_users;"
    pool.query(sqlInsert, (error, results) =>{
      if (error) {
          throw error
        }
      res.send(results.rows);
      console.log(results.rows);
        
        
  });
  })
//update canopy users username value
router.post('/update_username',(req,res, next)=> {
    const oldusername = req.body.oldusername;
    const username = req.body.username;
    
  
    const sql = 'UPDATE canopy_users SET username=? WHERE username = ?';
    pool.query(sql,[username,oldusername], (error, result)=>{
      res.send(result);
  })
  });

  //update canopy users password value
router.post('/update_password',(req,res, next)=> {
    const oldpassword = req.body.oldpassword;
    const password = req.body.password;
    
  
    const sql = 'UPDATE canopy_users SET password=? WHERE password = ?';
    pool.query(sql,[password,oldpassword], (error, result)=>{
      res.send(result);
  })
  });

  //delete canopy user
router.delete('/:userId', (req, res, next) => {
    const sql = `DELETE FROM canopy_users WHERE id = ${req.params.userId}`;
    pool.query(sql, (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).json({
          error: error
        });
      } else {
        res.status(200).json({
          message: 'canopy user deleted using DELETE',
          id: req.params.doctorId
        });
      }
    });
  });

  //create canopy mileage claim

router.post('/mileageclaim',upload.single('pdf'), (req, res, next)=> {

    
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

//read canopy mileage claims
router.get('/canopy_mileages',(req, res, next)=>{ 
    const sqlInsert = "SELECT * FROM canopy_mileage;"
    pool.query(sqlInsert, (error, results) =>{
      if (error) {
          throw error
        }
      res.send(results);
      console.log(results);
        
        
  });
  })

//update canopy mileage car number value
router.post('/update_carnumber',(req,res, next)=> {
    const carnumber = req.body.carnumber;
    
  
    const sql = 'UPDATE canopy_mileage SET carnumber=? WHERE carnumber = ?';
    pool.query(sql,[carnumber], (error, result)=>{
      res.send(result);
  })
  });

  //update canopy mileage car engine value
router.post('/update_carnumber',(req,res, next)=> {
    const carnumber = req.body.carnumber;
    const carengine = req.body.carengine;
    
  
    const sql = 'UPDATE canopy_mileage SET carengine=? WHERE carnumber = ?';
    pool.query(sql,[carengine,carnumber], (error, result)=>{
      res.send(result);
  })
  });

//update canopy mileage task done value
router.post('/update_task',(req,res, next)=> {
    const carnumber = req.body.carnumber;
    const taskdone = req.body.taskdone;
    
  
    const sql = 'UPDATE canopy_mileage SET taskdone=? WHERE carnumber = ?';
    pool.query(sql,[taskdone,carnumber], (error, result)=>{
      res.send(result);
  })
  });

  //update canopy mileage distance covered value
  router.post('/update_distance',(req,res, next)=> {
    const carnumber = req.body.carnumber;
    const distancecovered = req.body.distancecovered;
    
  
    const sql = 'UPDATE canopy_mileage SET distancecovered=? WHERE carnumber = ?';
    pool.query(sql,[distancecovered,carnumber], (error, result)=>{
      res.send(result);
  })
  });

  //update canopy mileage total value
  router.post('/update_total',(req,res, next)=> {
    const carnumber = req.body.carnumber;
    const totalcost = req.body.totalcost;
    
  
    const sql = 'UPDATE canopy_mileage SET totalcost=? WHERE carnumber = ?';
    pool.query(sql,[totalcost,carnumber], (error, result)=>{
      res.send(result);
  })
  });

  //update canopy mileage document value
  router.post('/update_doc',upload.single('pdf'),(req,res, next)=> {
    const carnumber = req.body.carnumber;
    const file = `http://localhost:4500/${req.file.originalname}`;
    
  
    const sql = 'UPDATE canopy_mileage SET file=? WHERE carnumber = ?';
    pool.query(sql,[file,carnumber], (error, result)=>{
      res.send(result);
  })
  });

  //delete canopy mileage
router.delete('/mileage/:userId', (req, res, next) => {
  const sql = `DELETE FROM canopy_mileage WHERE id = ${req.params.userId}`;
  pool.query(sql, (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).json({
        error: error
      });
    } else {
      res.status(200).json({
        message: 'canopy user deleted using DELETE',
        id: req.params.doctorId
      });
    }
  });
});

  
  //create canopy agenda
  //add doctor to database
router.post('/new_agenda', (req, res, next)=> {

    //const myid = seconds;
    const department = req.body.department;
    const agenda = req.body.agenda;
    const additional_info = req.body.additional_info;
    
    
    
    const sqlInsert = 'INSERT INTO canopy_agenda (department, agenda, additional_info) VALUES (?,?,?);';
    pool.query(sqlInsert,[ department,agenda,additional_info], (error, results) =>{
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

//read canopy minutes
router.get('/canopy_agenda',(req, res, next)=>{ 
  const sqlInsert = "SELECT * FROM canopy_agenda;"
  pool.query(sqlInsert, (error, results) =>{
    if (error) {
        throw error
      }
    res.send(results);
    console.log(results.rows);
      
      
});
})

//update canopy department
router.post('/update_department',(req,res, next)=> {
    const olddepartment = req.body.olddepartment;
    const department = req.body.department;
    
  
    const sql = 'UPDATE canopy_agenda SET department=? WHERE department = ?';
    pool.query(sql,[department,olddepartment], (error, result)=>{
      res.send(result);
  })
  });

  //update canopy agenda
router.post('/update_agenda',(req,res, next)=> {
    const oldagenda = req.body.oldagenda;
    const agenda = req.body.agenda;
    
  
    const sql = 'UPDATE canopy_agenda SET agenda=? WHERE agenda = ?';
    pool.query(sql,[agenda,oldagenda], (error, result)=>{
      res.send(result);
  })
  });


  //update canopy additional info
router.post('/update_additional_info',(req,res, next)=> {
    const oldadditional_info = req.body.oldadditional_info;
    const additional_info = req.body.additional_info;
    
  
    const sql = 'UPDATE canopy_agenda SET additional_info=? WHERE additional_info = ?';
    pool.query(sql,[additional_info,oldadditional_info], (error, result)=>{
      res.send(result);
  })
  });

  //create canopy notice
  router.post('/new_notice', (req, res, next)=> {

    
    const notice = req.body.notice;
    
    
    
    const sqlInsert = 'INSERT INTO canopy_notice (notice) VALUES (?);';
    pool.query(sqlInsert,[notice], (error, results) =>{
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

//read canopy notices
router.get('/canopy_notice',(req, res, next)=>{ 
  const sqlInsert = "SELECT * FROM canopy_notice;"
  pool.query(sqlInsert, (error, results) =>{
    if (error) {
        throw error
      }
    res.send(results);
    console.log(results);
      
      
});
})

//delete canopy notice
router.delete('/notice/:userId', (req, res, next) => {
  const sql = `DELETE FROM canopy_notice WHERE id = ${req.params.userId}`;
  pool.query(sql, (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).json({
        error: error
      });
    } else {
      res.status(200).json({
        message: 'canopy user deleted using DELETE',
        id: req.params.doctorId
      });
    }
  });
});

//create canopy minutes
router.post('/new_minute',upload.single('file'), (req, res, next)=> {

    const minute = req.body.minute;
    const file = `http://localhost:4500/${req.file.originalname}`;
    const sqlInsert = 'INSERT INTO canopy_minute (minute,file) VALUES (?,?);';
    pool.query(sqlInsert,[minute,file], (error, results) =>{
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


//create canopy minutes
router.post('/download/:id', (req, res, next)=> {

  
  //const file = `http://localhost:4500/${req.file.originalname}`;
  const sqlInsert = 'SELECT file FROM canopy_minute WHERE id=?;';
  pool.query(sqlInsert,[req.params.id], (error, results) =>{
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

     res.send(results);
  console.log(results);
        
  });
  
  
});


//read canopy minutes
router.get('/canopy_minute',(req, res, next)=>{ 
  const sqlInsert = "SELECT * FROM canopy_minute;"
  pool.query(sqlInsert, (error, results) =>{
    if (error) {
        throw error
      }
    res.send(results);
    console.log(results.rows);
      
      
});
})

  //delete canopy minute
  router.delete('/minute/:userId', (req, res, next) => {
    const sql = `DELETE FROM canopy_minute WHERE id = ${req.params.userId}`;
    pool.query(sql, (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).json({
          error: error
        });
      } else {
        res.status(200).json({
          message: 'canopy user deleted using DELETE',
          id: req.params.doctorId
        });
      }
    });
  });

//get all admins
router.get('/',(req, res, next)=>{
    res.status(200).json({
        message: 'Get admins using GET'
    });
});

//get a certain admin
router.get('/:adminId',(req, res, next)=>{
    res.status(200).json({
        message: 'Get a certain admin using GET',
        id: req.params.adminId
    });
});

//post admin
router.post('/',(req, res, next)=>{
    res.status(201).json({
        message: 'post admin using POST'
    });
});

//delete facilities
router.delete('/:adminId',(req, res, next)=>{
    res.status(200).json({
        message: 'delete a certain admin using DELETE',
        id: req.params.adminId
    });
});
module.exports=router;
