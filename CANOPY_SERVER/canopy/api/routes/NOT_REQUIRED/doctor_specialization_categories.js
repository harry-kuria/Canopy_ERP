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

router.post('/',(req, res, next)=>{
  const field = req.body.field;
  const sqlSelect = "INSERT INTO doctor_categories (field) VALUES (?)"; 
  pool.query(sqlSelect,[field], (error, result)=>{
      console.log(result);
  })
});

//get facilities
router.get('/',(req, res, next)=>{
    const sqlSelect = "SELECT * FROM doctor_categories"; 
    pool.query(sqlSelect, (error, result)=>{
        res.send(result);
    })
});
router.delete('/:doctorId', (req, res, next) => {
    const sql = `DELETE FROM doctor_categories WHERE id = ${req.params.doctorId}`;
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

//get a facility
// router.get('/:facilityId',(req, res, next)=>{
//     res.status(200).json({
//         message: 'Get a facility using GET',
//         id: req.params.facilityId
//     });
// });

// //post facilities
// router.post('/signup',upload.single('photoURL'),(req, res, next)=>{
//     //const photoURL = `http://192.168.100.28:5000/${req.file.path}`;
//     const facilityname = req.body.facilityname;
//     const facilityaddress = req.body.facilityaddress;
//     const contact = req.body.contact;
//     const email = req.body.email;
    
//     //const photoURL = `http://localhost:5000/${req.file.path}`;
    
//     const sqlInsert = 'INSERT INTO facilities (photoURL, facilityname, facilityaddress, contact,email) VALUES (?,?,?,?,?);';
//     pool.query(sqlInsert,[ "",facilityname, facilityaddress, contact,email ], (error, results) =>{
//         if (error) { 
//             throw error
//           }
          
          
//           res.status(200).json({
            
//             message: "Successful insertion to database",
//             // photoURL: photoURL,
//             facilityname: facilityname,
//             facilityaddress: facilityaddress,
//             contact: contact
//       //      photoURL: photoURL
            
//         })
//        // res.send(results.rows);
//     console.log(results);
          
//     });
    
// });

// //delete facilities
// router.delete('/:facilityId',(req, res, next)=>{
//     res.status(200).json({
//         message: 'delete a facility using DELETE',
//         id: req.params.facilityId
//     });
// });
module.exports=router;