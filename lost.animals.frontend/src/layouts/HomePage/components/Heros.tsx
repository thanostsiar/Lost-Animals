import React from "react";
import { Link } from "react-router-dom";

export const Heros = () => {
    return (
        <div>
            <div className='d-none d-lg-block'>
                <div className='row g-0 mt-5'>
                    <div className='col-sm-6 col-md-6'>
                        <div className='col-image-left'></div>
                    </div>
                    <div className='col-4 col-md-4 container d-flex justify-content-center align-items-center'>
                        <div className='ml-2'>
                            <h1>Have you lost your pet?</h1>
                            <p className='lead'>
                                Is your pet lost and want to take action? This is the reason why this website was built.
                                We would love to help you find and your loved animal!
                            </p>
                            <Link type='button' className='btn main-color btn-lg text-white' to='/register'>Register</Link>
                        </div>
                    </div>
                </div>
                <div className='row g-0'>
                    <div className='col-4 col-md-4 container d-flex 
                        justify-content-center align-items-center'>
                        <div className='ml-2'>
                            <h1>The lost animals alerts are always getting updated!</h1>
                            <p className='lead'>
                                Try to check in daily as the alerts are often updated!
                                Anyone can create an alert, even if they have not lost their pet, in order for
                                a bigger possibility to identify and find your loved pet!
                            </p>
                        </div>
                    </div>
                    <div className='col-sm-6 col-md-6'>
                        <div className='col-image-right'></div>
                    </div>
                </div>
            </div>

            {/* Mobile Heros */}
            <div className='d-lg-none'>
                <div className='container'>
                    <div className='m-2'>
                        <div className='col-image-left'></div>
                        <div className='mt-2'>
                            <h1>Have you lost your pet?</h1>
                            <p className='lead'>
                                Is your pet lost and want to take action? This is the reason why this website was built.
                                We would love to help you find and your loved animal!
                            </p>
                            <Link type='button' className='btn main-color btn-lg text-white' to='/register'>Register</Link>
                        </div>
                    </div>
                    <div className='m-2'>
                        <div className='col-image-right'></div>
                        <div className='mt-2'>
                            <h1>The lost animals alerts are always getting updated!</h1>
                            <p className='lead'>
                                Try to check in daily as the alerts are often updated!
                                Anyone can create an alert, even if they have not lost their pet, in order for
                                a bigger possibility to identify and find your loved pet!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}