import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { HomePage } from './layouts/HomePage/HomePage';
import { SearchAnimalsPage } from './layouts/SearchAnimalsPage/SearchAnimalsPage';
import { CreateAlertPage } from './layouts/CreateAlertPage/CreateAlertPage';
import UserRegistration from './layouts/User/UserRegistration';
import UserLogin from './layouts/User/UserLogin';
import { isUserLoggedIn } from './Auth/AuthService';


export const App = () => {

  function AuthenticatedRoute({children}){

    const isAuth = isUserLoggedIn();

    if(isAuth) {
      return children;
    }

    return <Navigate to="/login" />

  }


  return (
    <div className='d-flex flex-column min-vh-100'>
      <BrowserRouter>
        <Navbar />
        <div className='flex-grow-1'>
          <Routes>
            <Route path='/' element={<Navigate to='/home' replace />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/register' element={<UserRegistration />} />
            <Route path='/search' element={<SearchAnimalsPage />} />
            <Route path='/createAlert' element={
              <AuthenticatedRoute>
                <CreateAlertPage />
              </AuthenticatedRoute>
            }></Route>
            <Route path='/login' element={<UserLogin />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};
