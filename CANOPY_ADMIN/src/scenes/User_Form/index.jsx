import { Box, Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogTitle, Input,Snackbar,Alert } from '@mui/material';
//import firebase from "firebase/app";
import { useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const Form = () => {
  const [data, setData] = useState([]);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [photoURL, setPhotoURL] = useState("");
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [facilityname,setFacilityname] = useState("");
  const [facilityaddress,setFacilityaddress] = useState("");
  const [contact,setContact] = useState("");
  const [bed_capacity,setBed_capacity] = useState("");
  const [email,setEmail] = useState("");
  const [services,setServices] = useState("");
  const [category,setCategory] = useState("");
  const [level,setLevel] = useState("");

  const [openSnackbar, setOpenSnackbar] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState('');
const [snackbarSeverity, setSnackbarSeverity] = useState('');

const handleCloseSnackbar = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setOpenSnackbar(false);
};

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setPhotoURL(file);
    //const imageUrl = URL.createObjectURL(file);
    console.log(photoURL);
    // Use the imageUrl to display the image in the browser
  };

  const handleClick = async (e) => {

    const jsonData = {
      username: username,
      password: password
      
    };
    
    try {
      const response = await axios.post('http://localhost:4500/admin/new_user', jsonData);
      // Handle the response or perform any actions here
      console.log(response.data);
    } catch (error) {
      // Handle the error here
      console.error(error);
    }
  };


  
  const handleChangefacilityname = (event) => {
    setFacilityname(event.target.value);

    console.log('value is:', event.target.value)
  };
  const handleChangefacilityaddress = event => {
    setFacilityaddress(event.target.value);

    
  };
  const handleChangeUsername = event => {
    setUsername(event.target.value);

    
  };
  const handleChangePassword = event => {
    setPassword(event.target.value);

    
  };
  const handleChangecontact = event => {
    setContact(event.target.value);

    console.log('value is:', event.target.value);
  };
  const handleChangebed_capacity = event => {
    setBed_capacity(event.target.value);

    
  };
  const handleChangeCategory = event => {
    setCategory(event.target.value);

    
  };
  const handleChangeLevel = event => {
    setLevel(event.target.value);

    
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const firebaseConfig = {
  //   apiKey: "AIzaSyBeYn3AWJsdOSkIvxJpgSNE5LoTW3YhYGA",
  //   projectId: "afiagate-222fd",
  //   appId: "1:751685696912:android:946d8e88bcc747dfb08715",
  // };
  // firebase.initializeApp(firebaseConfig);

  

  
  

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const handlePhotoUpload = () => {
    if (!photoURL || !photoURL.name) {
      return;
    }
  
    const reader = new FileReader();
    reader.onload = () => {
      console.log("is"+ reader.result);
      setPhotoURL(reader.result);
      setOpen(false);
      toast.success('Photo uploaded successfully!');
    };
   
    reader.readAsDataURL(photoURL);
  };
  

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
         
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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="username"
                onBlur={handleBlur}
                onChange={handleChangeUsername}
                value={username}
                name="username"
                error={!!touched.username && !!errors.username}
                helperText={touched.username && errors.username}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="password"
                onBlur={handleBlur}
                onChange={handleChangePassword}
                value={password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              />
              
             
      
      


              
              
              
              
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" onClick={(event) => handleClick(event)} color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
          
          
        )}
        
      </Formik>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  username: yup.string().required("required"),
  password: yup.string().required("required"),
  
});
const initialValues = {
  username: "",
  password: "",
  
  
};

export default Form;
