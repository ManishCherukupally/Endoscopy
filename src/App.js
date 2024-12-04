// import logo from './logo.svg';
// import './App.css';
import { MantineProvider } from '@mantine/core';
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
// import Hills from './7hills';


function App() {
  return (
    <div className="App">
      <MantineProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="register" element={<Registeration />}/>
          <Route path="forgot" element={<ForgotPwd />}/>
          <Route path="otpnumber" element={<OtpNumber/>}/>
          <Route path="otpemail" element={<OtpEmail />}/>
          <Route path="settingpwd" element={<SettingPwd />}/>
          <Route path="account" element={<AccountRecover />}/>
          <Route path="patientinfo" element={<PatientInfo/>} />
          <Route path="headersetting" element={<HeaderSetting/>} />
          <Route path="hospital" element={<HospitalCard/>} />

        </Routes>
      </Router>
      </MantineProvider>
     {/* <Login/>  */}
     {/* <Registeration/> */}
     {/* <ForgotPwd/> */}
     {/* <OtpNumber/> */}
     {/* <OtpEmail/> */}
     {/* <SettingPwd/> */}
     {/* <AccountRecover/> */}
    </div>
  );
}

export default App;
