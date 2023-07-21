const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const nodemailer = require('nodemailer');


const mysql = require('mysql');
const pool = mysql.createConnection({     
    user: 'root',
    host: 'localhost',
    database: 'afiagate',
    password: 'H@rri50nmysql'
  })

const storage = multer.diskStorage({
    destination: "./facilityimages", /*(req, file,cb) => {
        cb(null, __dirname+'/images/')
    },*/
    filename: (req, file, cb) => {
        console.log(file);
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})

const upload = multer({storage: storage });


//get facilities
router.get('/',(req, res, next)=>{
    const sqlSelect = "SELECT * FROM registered_facilities"; 
    pool.query(sqlSelect, (error, result)=>{
        res.send(result);
    })
});

router.post('/personal',(req, res, next)=>{
    const medicEmail = req.body.medicEmail;
    const sqlSelect = "SELECT * FROM registered_facilities where medicEmail=?"; 
    pool.query(sqlSelect,[medicEmail], (error, result)=>{
        res.send(result);
        return result;
        
    })
    console.log("Medic email is "+medicEmail);
    
    //return result[0]
    
});

//get a facility
router.get('/:facilityId',(req, res, next)=>{
    res.status(200).json({
        message: 'Get a facility using GET',
        id: req.params.facilityId
    });
});

//post facilities
router.post('/add',upload.single('photoURL'),(req, res, next)=>{
    const facilityphoto = req.body.facilityphoto;
    const facilityname = req.body.facilityname;
    const facilityemail = req.body.facilityemail;
    const medicEmail = req.body.medicEmail;
    
    
    //const photoURL = `http://localhost:5000/${req.file.path}`;
    
    const sqlInsert = 'INSERT INTO registered_facilities (medicEmail, facilityname, facilityemail, facilityphoto,visible) VALUES (?,?,?,?,?);';
    pool.query(sqlInsert,[ medicEmail,facilityname, facilityemail, facilityphoto,false ], (error, results) =>{
        if (error) { 
            throw error
          }
          
          
    //       res.status(200).json({
            
    //         message: "Successful insertion to database",
            
    //   //      photoURL: photoURL
            
    //     })
       res.send(results);
    console.log(facilityphoto);
          
    });
    
});

router.patch('/facilities/:id', (req, res) => {
    const id = req.params.id;
    const visible = req.body.visible;
  
    const sqlUpdate = 'UPDATE registered_facilities SET visible = ? WHERE id = ?';
    pool.query(sqlUpdate, [visible, id], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json({
        message: "Successfully updated visible column",
        id: id,
        visible: visible
      });
    });
  });
  


//delete facilities
router.delete('/:facilityId',(req, res, next)=>{
    res.status(200).json({
        message: 'delete a facility using DELETE',
        id: req.params.facilityId
    });
});
module.exports=router;