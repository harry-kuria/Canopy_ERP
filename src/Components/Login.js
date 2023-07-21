import React, { useState, useEffect } from "react";
import logo from '../Assets/logo.png'
import Popup from './Popup';
import {FaUser, FaKey} from 'react-icons/fa'
import { BiHide, BiShow } from "react-icons/bi";
import axios from "axios";

function togglePasswordVisibility() {
    var passwordInput = document.getElementById("password");
    var passwordToggleIcon = document.querySelector(".password-toggle-icon i");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      passwordToggleIcon.classList.remove("fa-eye-slash");
      passwordToggleIcon.classList.add("fa-eye");
    } else {
      passwordInput.type = "password";
      passwordToggleIcon.classList.remove("fa-eye");
      passwordToggleIcon.classList.add("fa-eye-slash");
    }
  }
  const navigateToMileage = () => {
    window.location.href = '/mileage'; 
  };

const Login = () => {
  
    const [password, setPassword] = useState("");
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [username, setUsername] = useState(null);

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  const handleCloseErrorPopup = () => {
    setShowErrorPopup(false);
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    //localStorage.setItem("loggedInEmail",email);
    //console.log("Email: ", email);
    //console.log("Password: ", password);
    event.preventDefault();
    axios.post("http://localhost:4500/users/login",{
      "username":username,
      "password":password
    },{
      timeout: 30000 // Set timeout to 5 seconds
    })
    .then(response => {
      console.log("Data posted successfully:", response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      //setShowSuccessPopup(true);
      navigateToMileage();
    })
    .catch(error => {
      setShowErrorPopup(true);
      console.error("Error posting data:", error);
    });
  };
  const handleChangeUsername = event => {
    setUsername(event.target.value);

    console.log('value is:', event.target.value);
  };
  const handleChangePassword = event => {
    setPassword(event.target.value);

    console.log('value is:', event.target.value);
  };
  return (
    <div className='login-container'>
      {showSuccessPopup && (
        <Popup onClose={handleCloseSuccessPopup}>
          <h2>Login Successful!</h2>
          <p>You have successfully logged in.</p>
        </Popup>
      )}
      {showErrorPopup && (
        <Popup onClose={handleCloseErrorPopup}>
          <h2>Login Error</h2>
          <p>An error occurred during login. Please try again.</p>
        </Popup>
      )}
<img className='logo' src={logo}/>
      <div className='login'>
        <div className='username_input_container'>
            <FaUser color='white' size={30}/>
        <input className='username_input' type='text' placeholder='Username' onChange={(event) => setUsername(event.target.value)}/>
        </div>
        <div className='password_input_container'>
        <FaKey color='white' size={30}/>
      <input className='username_input' type={passwordShown ? "text" : "password"} required
              onChange={(event) => setPassword(event.target.value)} placeholder='Password'/>
              <span 
              className="password-toggle-icon" onClick={togglePasswordVisiblity} >{passwordShown ? <BiHide /> : <BiShow />}
              </span>
        </div>
        
      <button className='loginbtn' onClick={handleSubmit}>Submit</button>
      </div>
      
    </div>
  )
}

export default Login
