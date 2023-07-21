const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

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
    const sqlSelect = "SELECT * FROM facilities"; 
    pool.query(sqlSelect, (error, result)=>{
        res.send(result);
    })
});

//get a facility
router.get('/:facilityId',(req, res, next)=>{
    res.status(200).json({
        message: 'Get a facility using GET',
        id: req.params.facilityId
    });
});

//post facilities
router.post('/signup',upload.single('photoURL'),(req, res, next)=>{
    const photoURL = `http://192.168.43.191:5000/${req.file.path}`;
    const facilityname = req.body.facilityname;
    const facilityaddress = req.body.facilityaddress;
    const contact = req.body.contact;
    const email = req.body.email;
    const services = req.body.services;
    const facility_creator = req.body.facility_creator;
    
    //const photoURL = `http://localhost:5000/${req.file.path}`;
    
    const sqlInsert = 'INSERT INTO facilities (photoURL, facilityname, facilityaddress, contact,email,services,facility_creator) VALUES (?,?,?,?,?);';
    pool.query(sqlInsert,[ photoURL,facilityname, facilityaddress, contact,email,services,facility_creator ], (error, results) =>{
        if (error) { 
            throw error
          }
          
          
          res.status(200).json({
            
            message: "Successful insertion to database",
            photoURL: photoURL,
            facilityname: facilityname,
            facilityaddress: facilityaddress,
            contact: contact
      //      photoURL: photoURL
            
        })
       res.send(results);
    console.log(results);
          
    });
    
});

//delete facilities
router.delete('/:facilityId', (req, res, next) => {
    const id = req.params.facilityId;
    const sql = `DELETE FROM facilities WHERE id = ${id}`;

    pool.query(sql, (error, result) => {
        if (error) {
            return res.status(500).json({
                error: error.message
            });
        }
        res.status(200).json({
            message: 'Facility deleted successfully',
            id: id
        });
    });
});
module.exports=router;