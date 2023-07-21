import { Box, Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogTitle, Input,Snackbar,Alert } from '@mui/material';
//import firebase from "firebase/app";
import { useState, useEffect } from "react";
import Axios from 'axios';
import  {toast}  from 'react-toastify';
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const Form = () => {
  const [data, setData] = useState([]);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [photoURL, setPhotoURL] = useState("");
  const [open, setOpen] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const [description, setDescription] = useState('');
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
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("photoURL", photoURL);
      formData.append("facilityname", facilityname);
      formData.append("facilityaddress", facilityaddress);
      formData.append("contact", contact);
      formData.append("email", email);
      formData.append("services", services);
      formData.append("category", category);
      formData.append("level", level);
  
      const response = await Axios.post('http://18.191.22.39:5000/pharmacies/signup', formData);
  
      console.log(response.data);
      setSnackbarMessage('File uploaded successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error posting data:', error.message);
      console.error('Error posting data:', error.message);
    setSnackbarMessage('Error while uploading');
    setSnackbarSeverity('error');
    setOpenSnackbar(true);
    }
    
  };

  const handleChangefacilityname = (event) => {
    setFacilityname(event.target.value);

    console.log('value is:', event.target.value)
  };
  const handleChangefacilityaddress = event => {
    setFacilityaddress(event.target.value);

    
  };
  const handleChangeemail = event => {
    setEmail(event.target.value);

    console.log('value is:', event.target.value);
  };
  const handleChangeServices = event => {
    setServices(event.target.value);

    console.log('value is:', event.target.value);
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
      <Header title="CREATE PHARMACIES" subtitle="Create a New Pharmacy Profile" />

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
                label="Facility Name"
                onBlur={handleBlur}
                onChange={handleChangefacilityname}
                value={facilityname}
                name="facilityname"
                error={!!touched.facilityname && !!errors.facilityname}
                helperText={touched.facilityname && errors.facilityname}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Facility Address"
                onBlur={handleBlur}
                onChange={handleChangefacilityaddress}
                value={facilityaddress}
                name="facilityaddress"
                error={!!touched.facilityaddress && !!errors.facilityaddress}
                helperText={touched.facilityaddress && errors.facilityaddress}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Facility Email"
                onBlur={handleBlur}
                onChange={handleChangeemail}
                value={email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChangecontact}
                value={contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Services"
                onBlur={handleBlur}
                onChange={handleChangeServices}
                value={services}
                name="services"
                error={!!touched.services && !!errors.services}
                helperText={touched.services && errors.services}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Category (Public, Private, Mission, NGO)"
                onBlur={handleBlur}
                onChange={handleChangeCategory}
                value={category}
                name="category"
                error={!!touched.category && !!errors.category}
                helperText={touched.category && errors.category}
                sx={{ gridColumn: "span 4" }}
              />
              
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Level (Level 1, Level 2, Level 3, Level 4, Level 5, Level 6)"
                onBlur={handleBlur}
                onChange={handleChangeLevel}
                value={level}
                name="level"
                error={!!touched.level && !!errors.level}
                helperText={touched.level && errors.level}
                sx={{ gridColumn: "span 4" }}
              />
             <Button variant="contained" color="primary" onClick={handleOpen}>
        Upload a photo
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload a photo</DialogTitle>
        <DialogContent>
          <Input
            type="file"
            accept="image/*"
            name="photoURL"
            onChange={handlePhotoChange}
            inputProps={{
              multiple: false,
              
            }}
          />
          {photoURL && (
            <div>
              <img src={URL.createObjectURL(photoURL)} alt="Preview" style={{ maxWidth: '100%', marginTop: '16px' }} />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={!photoURL} onClick={handleClose} >Upload</Button>
        </DialogActions>
      </Dialog>
      


              
              
              
              
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" onClick={(event) => handleClick(event)} color="secondary" variant="contained">
                Create New Hospital
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
  facilityname: yup.string().required("required"),
  facilityaddress: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  services: yup.string().required("required"),
  bed_capacity: yup.string().required("required"),
  category: yup.string().required("required"),
  level: yup.string().required("required"),
});
const initialValues = {
  facilityname: "",
  facilityaddress: "",
  email: "",
  services: "",
  contact: "",
  bed_capacity: "",
  category:"",
  level:"",
  photoURL:"",
  
  
};

export default Form;
