import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { HomePage } from './layouts/HomePage/HomePage';
import { SearchAnimalsPage } from './layouts/SearchAnimalsPage/SearchAnimalsPage';

export const App = () => {
  return (
    <div>
      <Navbar/>
      {/* <HomePage/> */}
      <SearchAnimalsPage/>
      <Footer/>
    </div>
  );
};
