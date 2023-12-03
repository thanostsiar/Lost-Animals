import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { FindAnimals } from './layouts/HomePage/FindAnimals';
import { Carousel } from './layouts/HomePage/Carousel';

function App () {
  return (
    <div>
      <Navbar/>
      <FindAnimals/>
      <Carousel/>
    </div>
  );
};
export default App;
