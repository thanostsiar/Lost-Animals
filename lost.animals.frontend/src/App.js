import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { FindAnimals } from './layouts/HomePage/FindAnimals';

const App = () => {
  return (
    <div>
      <Navbar/>
      <FindAnimals/>
    </div>
  );
};

export default App;
