import React from 'react';
import AnimalAlertModel from '../../../models/AnimalAlertModel';

export const ReturnAnimal: React.FC<{animalAlert: AnimalAlertModel}> = (props) => {
    return (
        <div className='col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3'>
            <div className='text-center'>
                {props.animalAlert.imagePath ? 
                    <img
                        src={props.animalAlert.imagePath}
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
            </div>
        </div>
    );
};