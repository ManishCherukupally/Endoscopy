// import logo from './logo.svg';
// import './App.css';
// import Hills from './7hills';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Videocapturing from './Reports/Videocapturing';
import './style.css'
import VideocapturingPage from "./pages/VideocapturingPage";
import SelectPicturePage from "./pages/SelectPicturePage";
import ExportReportPage from "./pages/ExportReportPage";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" Component={VideocapturingPage} />
          <Route path="/selectpicture" Component={SelectPicturePage} />
          <Route path="/exportreport" Component={ExportReportPage} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
