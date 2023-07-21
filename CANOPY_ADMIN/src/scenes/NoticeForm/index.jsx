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


  const [notice, setNotice] = useState("");
  const saveFormData = async () => {

    const jsonData = {
      notice: notice,
      
    };
    
    try {
      const response = await axios.post('http://localhost:4500/admin/new_notice', jsonData);
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
  const handleChangeNotice = event => {
    setNotice(event.target.value);
  };
  
  return (
    <Box m="20px">
      <Header title="CREATE NOTICE" subtitle="Create a New Notice Entry" />

      <Formik
        
        onSubmit={handleFormSubmit}
        initialValues={{
          notice: "",
          
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
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <textarea
                fullWidth
                variant="filled"
                type="text"
                
                label="notice"
                onBlur={handleBlur}
                onChange={handleChangeNotice} // use custom function here
                value={notice} 
                name="notice"
                error={!!touched.notice && !!errors.notice}
                helperText={touched.notice && errors.notice}
                rows={20}
                style={{ width: '75vw' }}
                
                sx={{ gridColumn: "span 2",width: "500px", }}
              />
                            
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" onClick={handleFormSubmit} >
                Create New Notice
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
    notice: "",

    
    
  };

export default Form;
