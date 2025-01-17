// import logo from './logo.svg';
// import './App.css';
import React from 'react'
// import { MantineProvider } from '@mantine/core';

import "./style.css"

import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AccountRecover from './Components/LoginForm/AccountRecover';
import ForgotPwd from './Components/LoginForm/ForgotPwd';
import Login from './Components/LoginForm/Login';
import OtpEmail from './Components/LoginForm/OtpEmail';
import OtpNumber from './Components/LoginForm/OtpNumber';
import Registeration from './Components/LoginForm/Registeration';
import SettingPwd from './Components/LoginForm/SettingPwd';
import PatientInfo from './Components/LoginForm/PatientInfo';
import HeaderSetting from './Components/LoginForm/HeaderSetting';
import HospitalCard from './Components/LoginForm/HospitalCard';
import AllPatients from './Components/AllPatients';
import CameronWilliamson from './Components/CameronWillamson';
// import Videocapturingpage from './pages/VideocapturingPage';
// import SelectPicturePage from './pages/SelectPicturePage';
// import ExportReportPage from './pages/ExportReportPage';
// import './style.css'

import VideocapturingPage from "./pages/VideocapturingPage";
import SelectPicturePage from "./pages/SelectPicturePage";
import ExportReportPage from "./pages/ExportReportPage";
import EditImagePage from "./pages/EditImagePage"

// import Hills from './7hills';






const App = () => {
  return (
    <div>
      
      <Router>
        <Routes>
          <Route path="/" element={<Login />}/>

          <Route path="register" element={<Registeration />}/>
          <Route path="forgot" element={<ForgotPwd />}/>
          <Route path="otpnumber" element={<OtpNumber/>}/>
          <Route path="/otpemail" element={<OtpEmail />}/>
          <Route path="/settingpwd" element={<SettingPwd />}/>
          <Route path="/account" element={<AccountRecover />}/>
          <Route path="patientinfo" element={<PatientInfo/>} />
          <Route path="headersetting" element={<HeaderSetting/>} />
          <Route path="hospital" element={<HospitalCard/>} />
          <Route path="/allpatients" element={<AllPatients/>} />
          <Route path="/cameronwillamson" element={<CameronWilliamson/>} />
          <Route path="/videocapturing" element={<VideocapturingPage/>} />
          <Route path="/selectpicture" element={<SelectPicturePage/>} />
          <Route path="/exportreport" element={<ExportReportPage/>} />
          <Route path="/editreport" element={<EditImagePage/>} />
          {/* <Route path="/register" element={<Registeration />}/>
          <Route path="/forgot" element={<ForgotPwd />}/>
          <Route path="/otpnumber" element={<OtpNumber/>}/>
          <Route path="/otpemail" element={<OtpEmail />}/>
          <Route path="/settingpwd" element={<SettingPwd />}/>
          <Route path="/account" element={<AccountRecover />}/>
          <Route path="/patientinfo" element={<PatientInfo/>} />
          <Route path="/headersetting" element={<HeaderSetting/>} />
          <Route path="/hospital" element={<HospitalCard/>} />
          <Route path="/allpatients" element={<AllPatients/>} />
          <Route path="/cameronwillamson" element={<CameronWilliamson/>} />
          <Route path="/videocapturing" element={<VideocapturingPage />} />
          <Route path="/selectpicture" element={<SelectPicturePage />} />
          <Route path="/exportreport" element={<ExportReportPage />} /> */}

        </Routes>
      </Router>
      
    </div>
  )
}

export default App
