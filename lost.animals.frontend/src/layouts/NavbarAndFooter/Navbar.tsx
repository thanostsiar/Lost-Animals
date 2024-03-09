import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { isUserLoggedIn, logout } from "../../Auth/AuthService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from '@fortawesome/free-solid-svg-icons';

export const Navbar = () => {

  const isAuthenticated = isUserLoggedIn();

  const navigator = useNavigate();

  function handleLogout() {
    logout();
    navigator('/')
  }


  return (
    <nav className='navbar navbar-expand-lg navbar-dark main-color py-3'>
      <div className='container-fluid'>
        <span className='navbar-brand'>Lost Animals</span>
        <button className='navbar-toggler' type='button'
          data-bs-toggle='collapse' data-bs-target='#navbarNavDropdown'
          aria-controls='navbarNavDropdown' aria-expanded='false'
          aria-label='Toggle Navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavDropdown'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/home'>Home</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/search'>Search Animals</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/clinics'>Clinics</NavLink>
            </li>
            {
              isAuthenticated &&
              <li className='nav-item'>
                <NavLink className='nav-link' to='/createAlert'>Create Alert</NavLink>
              </li>
            }
          </ul>
          <ul className='navbar-nav ms-auto'>
            {
              !isAuthenticated &&
              <li className='nav-item m-1'>
                <Link type='button' className='btn btn-outline-light' to='/login'>Login</Link>
              </li>
            }
            {
              !isAuthenticated &&
              <li className='nav-item m-1'>
                <Link type='button' className='btn secondary-color' to='/register'>Register</Link>
              </li>
            }
            {
              isAuthenticated &&
              <li className='nav-item'>
                <NavLink className='nav-link' to='/chat'>
                  Chat <FontAwesomeIcon icon={faComment} />
                </NavLink>
              </li>
            }
            {
              isAuthenticated &&
              <li>
                <button className='btn btn-outline-light' onClick={handleLogout}>Logout</button>
              </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}; 