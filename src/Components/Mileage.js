import React, { useState, useEffect } from 'react'
import Logo from '../Assets/logo_small.png'
import Reports from '../Assets/reports.png'
import Budgets from '../Assets/budgets.png'
import Minutes from '../Assets/minutes.png'
import Agenda from '../Assets/agenda.png'
import MileageP from '../Assets/mileage.png'
import {GrAttachment} from 'react-icons/gr'
import axios from 'axios';
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
const navigateToAgenda = () => {
  window.location.href = '/agenda'; 
};
const Mileage = () => {
  const [carnumber, setCarNumber] = useState("");
  const [carengine, setCarEngine] = useState("");
  const [taskdone, setTaskDone] = useState("");
  const [distancecovered, setDistanceCovered] = useState("");
  const [totalcost, setTotalCost] = useState("");
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    
    if (storedUsername ==="" || storedUsername===null){
      navigateToHome()
    }
    else{
      setUsername(storedUsername);
    }
  }, []);
  
  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  const handleCloseErrorPopup = () => {
    setShowErrorPopup(false);
  };
  const navigateToHome = () => {
    window.location.href = '/'; 
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    //localStorage.setItem("loggedInEmail",email);
    //console.log("Email: ", email);
    //console.log("Password: ", password);
    
    const formData = new FormData();
  formData.append("carnumber", carnumber);
  formData.append("carengine", carengine);
  formData.append("taskdone", taskdone);
  formData.append("distancecovered", distancecovered);
  formData.append("totalcost", totalcost);
  formData.append("pdf", file); // Append the actual file data

  axios.post("http://localhost:4500/mileage/mileageclaim", formData, {
    
    timeout: 30000 // Set timeout to 30 seconds
  })
    .then(response => {
      //console.log("Data posted successfully:", response.data);
      // navigateToMileage();
      setShowSuccessPopup(true);
    })
    .catch(error => {
      setShowErrorPopup(true);
      console.error("Error posting data:", error);
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
          <img id='minuteIcon' src={Minutes} onClick={navigateToMinutes} />
          <h6 id='minuteText'></h6>
          </div>
          <div className='reportIconContainer'>
          <img id='agendaIcon' src={Agenda} onClick={navigateToAgenda}/>
          <h6 id='agendaText'></h6>
          </div>
          <div className='reportIconContainer'>
          <img id='mileageIcon' src={MileageP} />
          <h6 id='mileageText'></h6>
          </div>
          <AiOutlineArrowRight id='arrowIcon' color='white' size={40} onClick={increaseWidth}/>
        </div>

        <div className='mileage-mileage-title'>
          <h4>Mileage Claim</h4>
        </div>
      </div>

      <div className='mileage-mileage-details'>
        <div className='mileage-mileage-details-first-row'>
          <div className='mileage-mileage-car-number'>
            <label>Car Number</label>
            <input className='mileage-mileage-car-number-child-2' type='text' onChange={(event) => setCarNumber(event.target.value)}></input>

          </div>
          <div className='mileage-mileage-car-number'>
            <label>Car Engine</label>
            <select className='mileage-mileage-car-number-child-2' onChange={(event) => setCarEngine(event.target.value)}>
  <option value="">Select Your Car Engine Size</option>
  <option value="1000-1500">1000-1500</option>
  <option value="1500-2000">1500-2000</option>
  <option value="2500-3000">2500-3000</option>
  <option value="3000-4500">3000-4500</option>
  <option value="Over 4500">Over 4500</option>
</select>



          </div>
        </div>

        <div className='mileage-mileage-details-first-row'>
          <div className='mileage-mileage-car-number'>
            <label>Task Done</label>
            <input className='mileage-mileage-car-number-child-2' type='text' onChange={(event) => setTaskDone(event.target.value)}></input>

          </div>
          <div className='mileage-mileage-car-number'>
            <label style={{right: '20px'}}>Distance Covered</label>
            <input className='mileage-mileage-car-number-child-2' type='text' onChange={(event) => setDistanceCovered(event.target.value)}></input>
          </div>
        </div>
        <div className='mileage-mileage-details-first-row'>
          <div className='mileage-mileage-car-number'>
            <label>Total Cost</label>
            <input className='mileage-mileage-car-number-child-2' type='text' onChange={(event) => setTotalCost(event.target.value)}></input>

          </div>
          <div className='mileage-mileage-car-numbers'>
            <label style={{right: '20px'}}>Attach File</label>
            <form id="uploadbanner" encType="multipart/form-data" method="post" action="#">
   
   <input type="file" id="file-input" name='pdf' accept=".pdf,.doc,.docx" onChange={(event) =>setFile(event.target.files[0])}></input>
   
</form>
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
          <p>You have successfully added mileage.</p>
        </Popup>
      )}
      {showErrorPopup && (
        <Popup onClose={handleCloseErrorPopup}>
          <h2>Error</h2>
          <p>An error occurred when adding mileage. Please try again.</p>
        </Popup>
      )}
    </div>
  )
}

export default Mileage
