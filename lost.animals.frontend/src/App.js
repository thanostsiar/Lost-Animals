import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { FindAnimals } from './layouts/HomePage/FindAnimals';
import { Carousel } from './layouts/HomePage/Carousel';
import { Heros } from './layouts/HomePage/Heros';

function App () {
  return (
    <div>
      <Navbar/>
      <FindAnimals/>
      <Carousel/>
      <Heros/>
    </div>
  );
};
export default App;
