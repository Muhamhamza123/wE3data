import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './components/Welcome';
import UplaodForm from './components/UploadForm';

import Login from './components/Login';
import HelpComponent from './components/Help';

import Search from './components/Search';
import AdminLogin from './admin/components/AdminLogin';
import Home from './components/home';
import MyProfile from './components/MyProfile';
import MeasurementProjectsDetails from './components/MeasurementProjectsDetails';
import TopNavBar from './global-components/TopNavBar';
import SideNavBar from './global-components/SideNavBar';
import Footer from './global-components/Footer';
import '../src/styles/App.css';


const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/myprofile/:username" element={<MyProfile />} />

          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/user" element={<Login userType="user" />} />
          <Route
            path="/home/:username"
            element={
              <React.Fragment>
                <TopNavBar />
                <div className="content-container">
                  <SideNavBar />
                  <Home />
                </div>
              </React.Fragment>
            }
          />
          <Route
            path="/measurement-projects-details/:username"
            element={
              <React.Fragment>
                <TopNavBar />
                <div className="content-container">
                  <SideNavBar />
                  <MeasurementProjectsDetails />
                </div>
              </React.Fragment>
            }
          />


<Route
            path="/Search/:username"
            element={
              <React.Fragment>
                <TopNavBar />
                <div className="content-container">
                  <SideNavBar />
                  <Search/>
                </div>
              </React.Fragment>
            }
          />
          

<Route
            path="/HelpComponent/:username"
            element={
              <React.Fragment>
                <TopNavBar />
                <div className="content-container">
                  <SideNavBar />
                  <HelpComponent/>
                </div>
              </React.Fragment>
            }
          />
          

       
<Route
            path="/UploadForm/:username"
            element={
              <React.Fragment>
                <TopNavBar />
                <div className="content-container">
                  <SideNavBar />
                  <UplaodForm/>
                </div>
              </React.Fragment>
            }
          />


          <Route
            path="/*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
        <Footer />
      </div>

    </Router>
  );
};

export default App;
