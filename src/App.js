import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllEmployeeData from './components/Employee/AllEmployeeData';
import UserNavbar from './components/Navbar';
import Department from './components/DepartMent/Department';
import Piechart from './components/Chart/Piechart';
import BarChartComponent from './components/Chart/BarChart';
import AttendancePage from './components/Attendance/AttendancePage';


const App = () => {
  return (
    <Router>
      <div>
        <UserNavbar />
        <Routes>
          <Route path="/" element={<AllEmployeeData />} />

          <Route path="/Department" element={<Department/>} />
          <Route path="/Piechart" element={<Piechart/>} />
            <Route path="/AttendancePage" element={<AttendancePage/>} />

          <Route path="/Barchart" element={<BarChartComponent/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
