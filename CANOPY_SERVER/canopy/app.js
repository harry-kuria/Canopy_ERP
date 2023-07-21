const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fs = require("fs");
const url = require("url");
const cors = require('cors');





const userRoutes = require('./api/routes/users');
const adminRoutes = require('./api/routes/admin');
const mileageRoutes = require('./api/routes/mileage');
const agendaRoutes = require('./api/routes/agenda');
// const patientRoutes = require('./api/routes/patient');
// const doctorRoutes = require('./api/routes/doctor');
// const labresultsRoutes = require('./api/routes/lab_results');
// const newsfeedRoutes = require('./api/routes/newsfeed');
// const facilitiesRoutes = require('./api/routes/facilities');
// const nurseRoutes = require('./api/routes/nurse');
// const locumsRoutes = require('./api/routes/locums');
// const permanentRoutes = require('./api/routes/permanent');
// const physiotherapistsRoutes = require('./api/routes/physiotherapists');
// const doctorcategoryRoutes = require('./api/routes/doctor_specialization_categories');
// const nursecategoryRoutes = require('./api/routes/nurse_specialization_categories');
// const physiotherapistscategoryRoutes = require('./api/routes/physiotherapists_specialization_categories');
// const othercategoryRoutes = require('./api/routes/other_specialization_categories');
// const otherRoutes = require('./api/routes/other');
// const bookingRoutes = require('./api/routes/booking');
// const nurse_assistantsRoutes = require('./api/routes/nurse_assistants');
// const registeredFacilitiesRoutes = require('./api/routes/registered_facilities');
// const homeBasedcareCentresRoutes = require('./api/routes/homeBasedCareCentres');
// const labAndDiagnosticsRoutes = require('./api/routes/lab_and_diagnostics');
// const pharmaciesRoutes = require('./api/routes/pharmacies');
// const occupationalHealthAndSafetyRoutes = require('./api/routes/occupationalHealthAndSafety');
// const blood_banksRoutes = require('./api/routes/blood_banks');

app.use(morgan('dev'));
app.use(cors());
app.use('/mileagedocs',express.static('mileagedocs'));
app.use('/doctorimages',express.static('doctorimages'));
app.use('/nurseimages',express.static('nurseimages'));
app.use('/facilityimages',express.static('facilityimages'));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin','X-Requested-With','Content-Type','Accept','Authorization');
    if (req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next(); 
});

//setting up a middle ware for every request
app.use('/users',userRoutes);
app.use('/admin',adminRoutes);
app.use('/mileage',mileageRoutes);
app.use('/agenda',agendaRoutes);
// app.use('/patient',patientRoutes);
// app.use('/doctor',doctorRoutes);
// app.use('/labresults',labresultsRoutes);
// app.use('/newsfeed',newsfeedRoutes);
// app.use('/facilities',facilitiesRoutes);
// app.use('/nurse',nurseRoutes);
// app.use('/locums',locumsRoutes);
// app.use('/permanent',permanentRoutes);
// app.use('/physiotherapist',physiotherapistsRoutes);
// app.use('/doctor_specialization_categories',doctorcategoryRoutes);
// app.use('/nurse_specialization_categories',nursecategoryRoutes);
// app.use('/physiotherapists_specialization_categories',physiotherapistscategoryRoutes);
// app.use('/other_specialization_categories',othercategoryRoutes);
// app.use('/other',otherRoutes);
// app.use('/booking',bookingRoutes);
// app.use('/nurse_assistant',nurse_assistantsRoutes);
// app.use('/registered_facilities',registeredFacilitiesRoutes);
// app.use('/home_based_care',homeBasedcareCentresRoutes);
// app.use('/lab_and_diagnostics',labAndDiagnosticsRoutes);
// app.use('/pharmacies',pharmaciesRoutes);
// app.use('/occupational_health_and_safety',occupationalHealthAndSafetyRoutes);
// app.use('/blood_banks',blood_banksRoutes); 

app.get('/', (req, res) => {
    res.send('Welcome to my API!');
  });
  

//handling errors

app.use((req, res, next)=> {
    const error = new Error('Not Found');
    error.status=404;
    next(error);
});


app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
            
        }
    });
    console.log(error)
});
module.exports = app;