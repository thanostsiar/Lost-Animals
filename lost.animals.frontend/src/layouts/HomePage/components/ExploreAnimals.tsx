import React from "react";
import { Link } from "react-router-dom";
import { isUserLoggedIn } from "../../../Auth/AuthService";

export const ExploreAnimals = () => {

    const isAuthenticated = isUserLoggedIn();

    return (
        <div className='p-5 mb-4 header'>
            <div className='container-fluid py-5 text-white
                d-flex justify-content-center align-items-center'>
                <div>
                    <h1 className='display-5 fw-bold'>Find lost animals</h1>
                    <p className='col-md-8 fs-4'>Create alerts if you lost or found a pet </p>
                    {
                        isAuthenticated &&
                        <Link type='button' className='btn main-color btn-lg text-white' to='/createAlert'>
                            Create Alert
                        </Link>
                    }
                </div>
            </div>
        </div>
    );
}; 