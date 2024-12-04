import logo from './logo.svg';
import './App.css';
import AllPatients from './Components/AllPatients';
import CameronWillamson from './Components/CameronWillamson';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
    {/* <AllPatients/>
    <CameronWillamson/> */}
    <MantineProvider>
      <Router>
        <Routes>
          <Route path="/allpatients" element={<AllPatients/>}/>
          <Route path="/cameronwillamson" element={<CameronWillamson/>}/>
        </Routes>
      </Router>
    </MantineProvider>
    </div>
  );
}

export default App;
