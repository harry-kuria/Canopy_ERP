import React from 'react';
import {  BrowserRouter as Router, Route, Routes, redirect } from 'react-router-dom';
import Home from './Components/Home';
import Mileage from './Components/Mileage';
import Agenda from './Components/Agenda';
import Notices from './Components/Notices';
import Minutes from './Components/Minutes';

const AppRouter = () => {
  return (
    <Router>
  <Routes>
       <Route exact path='/' index element={<Home />} />
       <Route path='/mileage' element={<Mileage />} />
       <Route path='/agenda' element={<Agenda />} />
       <Route path='/notice' element={<Notices />} />
       <Route path='/minutes' element={<Minutes />} />
    
      
      
      
       

        </Routes>
    </Router>
  )
}

export default AppRouter