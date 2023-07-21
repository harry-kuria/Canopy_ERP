import React, { useState,useEffect } from 'react'
import Logo from '../Assets/logo_small.png'
import Reports from '../Assets/reports.png'
import Budgets from '../Assets/budgets.png'
import Minutes from '../Assets/minutes.png'
import AgendaP from '../Assets/agenda.png'
import MileageP from '../Assets/mileage.png'
import {GrAttachment} from 'react-icons/gr'
import axios from 'axios'
import Popup from './Popup';
import {FaUserCircle} from 'react-icons/fa'
import {AiOutlineArrowRight} from 'react-icons/ai'


function increaseWidth() {
  const navbar = document.getElementById('mileageLeftNavbar');
  const minuteicon = document.getElementById('minuteIcon');
  const agendaicon = document.getElementById('agendaIcon');
  const mileageicon = document.getElementById('mileageIcon');
  const reporticon = document.getElementById('reportIcon');
  const arrowicon = document.getElementById('arrowIcon');
  const reporttext = document.getElementById('reportText');
  const minutetext = document.getElementById('minuteText');
  const agendatext = document.getElementById('agendaText');
  const mileagetext = document.getElementById('mileageText');

  const initialNavbarWidth = navbar.offsetWidth; // Get the initial width of the navbar
    const targetNavbarWidth = 200; // Set the desired target width for the navbar
  
  if (navbar.offsetWidth === targetNavbarWidth) {
    // If the navbar is already expanded, reset it to its initial width
    navbar.style.width = ''; // Reset the width to its default value
    minuteicon.style.marginRight = '';
    agendaicon.style.marginRight = '';
    mileageicon.style.marginRight = '';
    arrowicon.style.marginRight = '';
    reporticon.style.marginRight = '';
    reporticon.style.position='';
    agendaicon.style.position='';
    minuteicon.style.position='';
    mileageicon.style.position='';
    arrowicon.style.position='';
    arrowicon.style.marginTop='';
    reporttext.style.marginLeft = '';
    agendatext.style.marginLeft = '';
    minutetext.style.marginLeft = '';
    mileagetext.style.marginLeft = '';
    reporttext.innerText='';
    minutetext.innerText='';
    agendatext.innerText='';
    mileagetext.innerText='';
    reporttext.style.display = '';
    minutetext.style.display='';
    agendatext.style.display='';
    mileagetext.style.display='';
  } else {
    // If the navbar is not expanded, increase its width
    navbar.style.width = targetNavbarWidth + 'px'; // Adjust the width of the navbar
    const minuteIconMargin = -(initialNavbarWidth - targetNavbarWidth);
    navbar.style.width = targetNavbarWidth + 'px'; // Adjust the width of the navbar
    
    minuteicon.style.marginRight = minuteIconMargin - '10px';
    agendaicon.style.marginRight = minuteIconMargin - '10px';
    mileageicon.style.marginRight = minuteIconMargin - '10px';
    arrowicon.style.marginRight = minuteIconMargin - '10px';
    reporticon.style.marginRight = minuteIconMargin - '10px';
    reporticon.style.position='fixed';
    minuteicon.style.position='fixed';
    agendaicon.style.position='fixed';
    mileageicon.style.position='fixed';
    arrowicon.style.position='absolute';
    arrowicon.style.marginTop='60vh';
   
    reporttext.style.marginLeft = minuteIconMargin + 'px';
    minutetext.style.marginLeft = minuteIconMargin + 'px';
    agendatext.style.marginLeft = minuteIconMargin + 'px';
    mileagetext.style.marginLeft = minuteIconMargin + 'px';
    reporttext.innerText="Report";
    minutetext.innerText="Minutes";
    agendatext.innerText="Agenda";
    mileagetext.innerText="Mileage";
    reporttext.style.display = 'flex';
    minutetext.style.display = 'flex';
    agendatext.style.display = 'flex';
    mileagetext.style.display = 'flex';

  }

  
}

const navigateToNotice = () => {
  window.location.href = '/notice'; 
};
const navigateToMinutes = () => {
  window.location.href = '/minutes'; 
};
const navigateToMileage = () => {
  window.location.href = '/mileage'; 
};
const Agenda = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername ==="" || storedUsername===null){
      navigateToHome()
    }
    else{
      setUsername(storedUsername);
    }
  }, []);
  const navigateToHome = () => {
    window.location.href = '/'; 
  };
  const [department, setDepartment] = useState("");
  const [canopyAgenda, setCanopyAgenda] = useState("");
  const [additionalInformation, setAdditionalInformation] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  const handleCloseErrorPopup = () => {
    setShowErrorPopup(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const jsonData = {
      department: department,
      agenda: canopyAgenda,
      additional_info: additionalInformation
    };
    
    axios.post("http://localhost:4500/agenda/new_agenda", jsonData, {
      headers: {
        "Content-Type": "application/json"
      },
      timeout: 30000
    })
      .then(response => {
        //console.log("Data posted successfully:", response.data);
        // navigateToMileage();
        setShowSuccessPopup(true);

      })
      .catch(error => {
        setShowErrorPopup(true);
        //console.error("Error posting data:", error);
      });
  };
  

  return (
    <div className='mileage-container'>
      <div className='mileage-navbar'>
      
      <div className='mileage-logo-and-username'>
        <img src={Logo}/>
        <p><FaUserCircle/><strong> {username} </strong></p>
        </div>
        <div className='mileage-navbar-line-border'></div>
      </div>
      <div className='mileage-dash-navigation'>
      <div className='milage-left-navbar' id='mileageLeftNavbar'>
          <div className='reportIconContainer'>
          <img id='reportIcon' src={Reports} onClick={navigateToNotice}/>
          <h6 id='reportText'></h6>
          </div>
          
          {/* <img src={Budgets}/> */}
          <div className='reportIconContainer'>
          <img id='minuteIcon' src={Minutes} onClick={navigateToMinutes}/>
          <h6 id='minuteText'></h6>
          </div>
          <div className='reportIconContainer'>
          <img id='agendaIcon' src={AgendaP} />
          <h6 id='agendaText'></h6>
          </div>
          <div className='reportIconContainer'>
          <img id='mileageIcon' src={MileageP} onClick={navigateToMileage}/>
          <h6 id='mileageText'></h6>
          </div>
          <AiOutlineArrowRight id='arrowIcon' color='white' size={40} onClick={increaseWidth}/>
        </div>

        <div className='mileage-mileage-title'>
          <h4>Agenda Setting</h4>
        </div>
      </div>

      <div style={{height:'488px',width: '855px'}} className='mileage-mileage-details'>
        <div className='mileage-mileage-details-first-row'>
          <div className='mileage-mileage-car-number'>
            <label >Department</label>
            

          </div>
          <div className='mileage-mileage-car-number'>
            <select style={{width:'37vw',marginBottom:'40px', borderRadius:'5px',height:'40px',marginRight:'30px'}} className='mileage-mileage-car-number-child-2' onChange={(event) => setDepartment(event.target.value)}>
  <option value="Select your Department" ></option>
  <option value="Spiritual">Spiritual</option>
  <option value="Innovation">Innovation</option>
  <option value="Operations">Operations</option>
  <option value="Home-life">Home-life</option>
  <option value="Academics">Academics</option>
</select>



          </div>
        </div>

        <div className='mileage-mileage-details-first-row'>
          <div className='mileage-mileage-car-number'>
            <label >Agenda</label>
            

          </div>
          <div className='mileage-mileage-car-number'>
            <textarea rows={4} cols={50} style={{lineHeight:'1.5rem', width:'37vw',marginBottom:'40px', borderRadius:'5px',height:'120px',marginRight:'30px'}} className='mileage-mileage-car-number-child-2' onChange={(event) => setCanopyAgenda(event.target.value)}>
  
</textarea>



          </div>
        </div>
        <div className='mileage-mileage-details-first-row'>
          <div className='mileage-mileage-car-number'>
            <label style={{}} >Additional Information</label>
            

          </div>
          <div className='mileage-mileage-car-number'>
            <textarea rows={4} cols={50} style={{lineHeight:'1.5rem', width:'37vw',marginBottom:'40px', borderRadius:'5px',height:'120px',marginRight:'30px'}} className='mileage-mileage-car-number-child-2' onChange={(event) => setAdditionalInformation(event.target.value)}>
  
</textarea>



          </div>
        </div>

        <div className='mileage-mileage-details-first-row'>
          <div className='mileage-mileage-car-number'>
            <label style={{fontSize:'2rem',alignSelf:'center'}} onClick={handleSubmit}>Submit</label>
            

          </div>
          
        </div>
      </div>
      {showSuccessPopup && (
        <Popup onClose={handleCloseSuccessPopup}>
          <h2>Successful!</h2>
          <p>You have successfully Added the Agenda.</p>
        </Popup>
      )}
      {showErrorPopup && (
        <Popup onClose={handleCloseErrorPopup}>
          <h2>Error</h2>
          <p>An error occurred when adding the agenda. Please try again.</p>
        </Popup>
      )}
     
    </div>
  )
}

export default Agenda
