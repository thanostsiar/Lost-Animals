import React from 'react';
import AnimalAlertModel from '../../../models/AnimalAlertModel';

export const ReturnAnimal: React.FC<{animalAlert: AnimalAlertModel}> = (props) => {
    return (
        <div className='col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3'>
            <div className='text-center'>
                {props.animalAlert.picture_url ? 
                    <img
                        src={props.animalAlert.picture_url}
                        width='233'
                        height='233'
                        alt="animal"
                    />
                  : 
                    <img
                        src={require('./../../../Images/cat_on_leg.jpg')}
                        width='233'
                        height='233'
                        alt='cat'
                    />
                }
                <h6 className='mt-2'>{props.animalAlert.title}</h6>
                <p>{props.animalAlert.animal.name}</p>
                <a className='btn main-color text-white' href='#'>View</a>
            </div>
        </div>
    );
};