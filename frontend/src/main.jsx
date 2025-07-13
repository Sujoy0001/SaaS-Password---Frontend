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

const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />, 
      children: [
        { index: true, element: <LandingPage /> },    
        { path: "register", element: <RegisterPage /> },  
        { path: "login", element: <LoginPage /> },  
      ],
    },
    {
      path: "/index",
      element: <Layout2 />,
      children: [
        { index: true, element: <ApiLinks /> },
        { path: "user/all", element: <AllUsers /> },  
        { path: "overview", element: <Overview /> },  
      ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);