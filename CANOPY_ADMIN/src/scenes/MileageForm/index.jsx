import { Box, Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import * as firebase from 'firebase/app';
import { getDatabase, ref, push } from "firebase/database";
import 'firebase/database';
import axios from 'axios';
import { useState, useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

// const auth = getAuth();
// const firebaseConfig = { 
//   apiKey: "AIzaSyBeYn3AWJsdOSkIvxJpgSNE5LoTW3YhYGA",
//   authDomain: "afiagate-222fd.firebaseapp.com",
//   projectId: "afiagate-222fd",
//   appId: "1:751685696912:android:946d8e88bcc747dfb08715",
//   messagingSenderId: "751685696912"
// };
const Form = () => {
  const [data, setData] = useState([]);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  
  // firebase.initializeApp(firebaseConfig,{});


  const [carnumber, setCarnumber] = useState("");
  const [carengine, setCarengine] = useState("");
  const [taskdone, setTaskdone] = useState("");
  const [distancecovered, setDistancecovered] = useState("");
  const [totalcost, setTotalcost] = useState("");
  const [file, setFile] = useState("");

  const saveFormData = async () => {

    const jsonData = {
      carnumber: carnumber,
      carengine: carengine,
      taskdone: taskdone,
      distancecovered: distancecovered,
      totalcost: totalcost,
      file: file,
      
    };
    
    try {
      const response = await axios.post('http://localhost:4500/admin/mileageclaim', jsonData);
      // Handle the response or perform any actions here
      console.log(response.data);
    } catch (error) {
      // Handle the error here
      console.error(error);
    }
  };

    
  const handleFormSubmit = (values) => {
    console.log(values);
    saveFormData();

    
  };
  const handleChangeCarNumber = event => {
    setCarnumber(event.target.value);
  };
  const handleChangeCarEngine = event => {
    setCarengine(event.target.value);
  };
  const handleChangeTaskdone = event => {
    setTaskdone(event.target.value);
  };
  const handleChangeDistanceCovered = event => {
    setDistancecovered(event.target.value);
  };
  const handleChangeTotalcost = event => {
    setTotalcost(event.target.value);
  };
  const handleChangeFile = event => {
    const selectedFile = event.target.files[0]; // Access the first selected file
  setFile(selectedFile);
  };
  return (
    <Box m="20px">
      <Header title="CREATE MILEAGE" subtitle="Create a New Mileage Entry" />

      <Formik
        
        onSubmit={handleFormSubmit}
        initialValues={{
          carnumber: "",
          carengine: "",
          taskdone: "",
          distancecovered: "",
          totalcost: "",
          file: "",
          
        }}
        validationSchema={yup.object({
          minute: yup.string().required("Required"),
          })}
        
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateRows="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <textarea
                fullWidth
                variant="filled"
                type="text"
                
                label="carnumber"
                onBlur={handleBlur}
                onChange={handleChangeCarNumber} // use custom function here
                value={carnumber} 
                name="carnumber"
                error={!!touched.carnumber && !!errors.carnumber}
                helperText={touched.carnumber && errors.carnumber}
                rows={2}
                placeholder="Car Number"
                
                style={{ width: '75vw', textAlign: 'center',fontWeight: 'bold', fontSize: '1.1rem' }}
                
                sx={{ gridColumn: "span 2",width: "500px", }}
              />

<textarea
                fullWidth
                variant="filled"
                type="text"
                
                label="carengine"
                onBlur={handleBlur}
                onChange={handleChangeCarEngine} // use custom function here
                value={carengine} 
                name="carengine"
                error={!!touched.carengine && !!errors.carengine}
                helperText={touched.carengine && errors.carengine}
                rows={2}
                placeholder="Car Engine"
                
                style={{ width: '75vw', textAlign: 'center',fontWeight: 'bold', fontSize: '1.1rem' }}
                
                sx={{ gridColumn: "span 2",width: "500px", }}
              />

                <textarea
                fullWidth
                variant="filled"
                type="text"
                
                label="taskdone"
                onBlur={handleBlur}
                onChange={handleChangeTaskdone} // use custom function here
                value={taskdone} 
                name="taskdone"
                error={!!touched.taskdone && !!errors.taskdone}
                helperText={touched.taskdone && errors.taskdone}
                rows={2}
                placeholder="Task Done"
                
                style={{ width: '75vw', textAlign: 'center',fontWeight: 'bold', fontSize: '1.1rem' }}
                
                sx={{ gridColumn: "span 2",width: "500px", }}
              />            
              <textarea
                fullWidth
                variant="filled"
                type="text"
                
                label="totalcost"
                onBlur={handleBlur}
                onChange={handleChangeTotalcost} // use custom function here
                value={totalcost} 
                name="totalcost"
                error={!!touched.totalcost && !!errors.totalcost}
                helperText={touched.totalcost && errors.totalcost}
                rows={2}
                placeholder="Total Cost"
                
                style={{ width: '75vw', textAlign: 'center',fontWeight: 'bold', fontSize: '1.1rem' }}
                
                sx={{ gridColumn: "span 2",width: "500px", }}
              />
              

<textarea
                fullWidth
                variant="filled"
                type="text"
                
                label="distancecovered"
                onBlur={handleBlur}
                onChange={handleChangeDistanceCovered} // use custom function here
                value={distancecovered} 
                name="distancecovered"
                error={!!touched.distancecovered && !!errors.distancecovered}
                helperText={touched.distancecovered && errors.distancecovered}
                rows={2}
                placeholder="Distance covered"
                
                style={{ width: '75vw', textAlign: 'center',fontWeight: 'bold', fontSize: '1.1rem' }}
                
                sx={{ gridColumn: "span 2",width: "500px", }}
              />

<input
  type="file"
  onChange={handleChangeFile}
/>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" onClick={handleFormSubmit} >
                Create New Mileage
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;


  const checkoutSchema = yup.object().shape({
    minute: yup.string().required("required"),
    
  });
  const initialValues = {
    minute: "",

    
    
  };

export default Form;
