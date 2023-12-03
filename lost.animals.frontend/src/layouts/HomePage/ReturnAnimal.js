import React from 'react';

export const ReturnAnimal = () => {
    return (
        <div className='col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3'>
            <div className='text-center'>
                <img
                    src={require('./../../Images/cat_on_leg.jpg')}
                    width='233'
                    height='233'
                    alt='cat'
                />
                <h6 className='mt-2'>Lost Animal</h6>
                <p>Lost Animals</p>
                <a className='btn main-color text-white' href='#'>View</a>
            </div>
        </div>
    );
};