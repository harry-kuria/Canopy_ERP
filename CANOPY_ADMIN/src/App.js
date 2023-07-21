import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import MileageForm from "./scenes/MileageForm";
import Mileage from "./scenes/Mileage";
import Nurse from "./scenes/Notices";
import NoticeForm from "./scenes/NoticeForm";
import Physiotherapist from "./scenes/CanopyUsers";
import Other from "./scenes/OtherSpecialists";
import Hospital from "./scenes/Hospitals";
import Bookings from "./scenes/Bookings/index";
import Documents from "./scenes/Documents/index";
import PayLaterBookings from "./scenes/PayLaterBook/index";
import HomeBased from "./scenes/Home-BasedCare";
import Lab from "./scenes/LabAndDiagnostics";
import UserForm from "./scenes/User_Form";
import Occupation from "./scenes/OccupationalHealthAndSafety";
import BloodBank from "./scenes/BloodBanks";
import DoctorCategory from "./scenes/DoctorCategories";
import NurseCategory from "./scenes/NurseCategories";
import PhysiotherapistCategory from "./scenes/PhysioCategories";
import OtherCategory from "./scenes/OtherCategories";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import MinutesForm from "./scenes/Minuteform";
import Minutes from "./scenes/Minutes";
// import HospitalsForm from "./scenes/HospitalsForm";
// import HomeBasedForm from "./scenes/Home_Based_Form";
// import LabsForm from "./scenes/Labs_Form";
// import PharmaciesForm from "./scenes/Pharmacies_Form";
// import OccupationForm from "./scenes/Occupation_Form";
// import BloodForm from "./scenes/Blood_banks_Form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/mileageForm" element={<MileageForm />} />
              <Route path="/mileage" element={<Mileage />} />
              <Route path="/notices" element={<Nurse />} />
              <Route path="/minute_form" element={<MinutesForm/>} />
              <Route path="/minutes" element={<Minutes/>} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/pay_later_bookings" element={<PayLaterBookings />} />
              <Route path="/notice_form" element={<NoticeForm />} />
              <Route path="/users" element={<Physiotherapist />} />
              <Route path="/other" element={<Other />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/hospitals" element={<Hospital />} />
              <Route path="/home-based" element={<HomeBased />} />
              <Route path="/labs" element={<Lab />} />
              <Route path="/user_form" element={<UserForm />} />
              <Route path="/occupation" element={<Occupation />} />
              <Route path="/bloodbanks" element={<BloodBank />} />
              <Route path="/doc_categories" element={<DoctorCategory />} />
              <Route path="/nurse_categories" element={<NurseCategory />} />
              <Route path="/physio_categories" element={<PhysiotherapistCategory />} />
              <Route path="/other_categories" element={<OtherCategory />} />
              <Route path="/invoices" element={<Invoices />} />
              
              {/* <Route path="/hospitals_form" element={<HospitalsForm />} />
              <Route path="/home_based_form" element={<HomeBasedForm />} />
              <Route path="/labs_form" element={<LabsForm />} />
              <Route path="/pharmacies_form" element={<PharmaciesForm />} />
              <Route path="/occupation_form" element={<OccupationForm />} />
              <Route path="/blood_form" element={<BloodForm />} /> */}
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
              
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
