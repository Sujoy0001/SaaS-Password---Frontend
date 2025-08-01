import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import Layout from './components2/Layout';
import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';


import Layout2 from './components2/Layout2';
import ApiLinks from './Pages/ApiPage';
import AllUsers from './Pages/UsershowPage';
import Overview from './Pages/OverviewPage';
import ApiUsagePage from './Pages/ApiUsagePage';

import { ProtectRoute, PublicRoute } from './utils/userAuthenticated';
import ProfilePage from './Pages/ProfilePage';

import ContactPage from './Pages/Contact';

const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />, 
      children: [
        { index: true, element: <LandingPage /> },    
        { path: "register", element: (<PublicRoute><RegisterPage /></PublicRoute>) },  
        { path: "login", element: (<PublicRoute><LoginPage /></PublicRoute>) },  
        { path: "contact", element: <ContactPage /> },  
        { path: "docs", element: <Overview /> }, 
      ],
    },
    {
      path: "/index",
      element: <Layout2 />,
      children: [
        { index: true, element: (<ProtectRoute><ApiLinks /></ProtectRoute>) },
        { path: "users", element: (<ProtectRoute><AllUsers /></ProtectRoute>) },  
        { path: "docs", element: (<ProtectRoute><Overview /></ProtectRoute>) },  
        { path: "profile", element: (<ProtectRoute><ProfilePage /></ProtectRoute>) }, 
        { path: "contact", element: (<ProtectRoute><ContactPage /></ProtectRoute>) },  
        { path: "useapi", element: (<ProtectRoute><ApiUsagePage /></ProtectRoute>)}
      ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);