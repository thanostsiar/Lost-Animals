import React from "react";

export const ExploreAnimals = () => {
    return (
        <div className='p-5 mb-4 header'>
            <div className='container-fluid py-5 text-white
                d-flex justify-content-center align-items-center'>
                <div>
                    <h1 className='display-5 fw-bold'>Find lost animals</h1>
                    <p className='col-md-8 fs-4'>Create alerts if you lost or found a pet </p>
                    <a type='button' className='btn main-color btn-lg text-white' href='#'>
                        Create Alert
                    </a>
                </div>
            </div>
        </div>
    );
}; 