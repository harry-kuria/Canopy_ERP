import React from 'react'
import { useState, useEffect } from 'react'
import Logo from '../Assets/logo_small.png'
import Reports from '../Assets/reports.png'
import Budgets from '../Assets/budgets.png'
import MinutesP from '../Assets/minutes.png'
import AgendaP from '../Assets/agenda.png'
import MileageP from '../Assets/mileage.png'
import {GrAttachment} from 'react-icons/gr'
import {FaUserCircle} from 'react-icons/fa'
import {AiOutlineArrowRight} from 'react-icons/ai'
import Axios from "axios";
import download from '../Assets/download.png'

const navigateToAgenda = () => {
  window.location.href = '/agenda'; 
};
const navigateToNotice = () => {
  window.location.href = '/notice'; 
};
const navigateToMileage = () => {
  window.location.href = '/mileage'; 
};
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


const Minutes = () => {
  const [username, setUsername] = useState("");
  const [minuteList, setMinuteList] = useState([]);

  const handleDownload = (id) => {
    try {
      const response =  Axios.post(`/admin/download/${id}`);
      // Assuming the API response contains the file URL
      const fileUrl = response.data.file;
      window.location.href = fileUrl; // Initiates the file download
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername ==="" || storedUsername===null){
      navigateToHome()
    }
    else{
      setUsername(storedUsername);
    }
  }, []);
  useEffect(() => {
    //Axios.get("http://localhost:5000/doctor").then((response) => {
    Axios.get("http://localhost:4500/admin/canopy_minute").then((response) => {
      setMinuteList(response.data);
    });
  }, []);
  const navigateToHome = () => {
    window.location.href = '/'; 
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
          <img id='minuteIcon' src={MinutesP} />
          <h6 id='minuteText'></h6>
          </div>
          <div className='reportIconContainer'>
          <img id='agendaIcon' src={AgendaP} onClick={navigateToAgenda}/>
          <h6 id='agendaText'></h6>
          </div>
          <div className='reportIconContainer'>
          <img id='mileageIcon' src={MileageP} onClick={navigateToMileage}/>
          <h6 id='mileageText'></h6>
          </div>
          <AiOutlineArrowRight id='arrowIcon' color='white' size={40} onClick={increaseWidth}/>
        </div>

        <div className='mileage-mileage-title'>
          <h4>Minutes</h4>
        </div>
      </div>

      <div style={{height:'488px',width: '855px'}} className='mileage-mileage-details'>
        <div className='mileage-mileage-details-first-row'>
          <div className='mileage-mileage-car-number'>
            <input style={{height:'25px'}} className='mileage-mileage-car-number-child-2' type='text'/>
          </div>
          
          
        </div>
        <div style={{width:'99.5%',height:'0px',border:'3px solid #6B5539',marginTop:'60px'}} className='minutes-lineseparator'></div>
        

      {minuteList.map((val,index) => {
        return(
         
            <div
            key={index}
            style={{ backgroundColor: index % 2 === 0 ? '#D9D9D9' : 'white',width: '100%',textAlign:'left',display:'flex' }}
            className='rectangle'
          >
            

            <p>{val.minute}</p>
           
<img onClick={handleDownload} src={download} style={{float:'right',right:'230px',position:'absolute',width:'30px',height:'30px'}}></img>

</div>
        )
        
      })}
       
       

      </div>
     
    </div>
  )
}

export default Minutes
