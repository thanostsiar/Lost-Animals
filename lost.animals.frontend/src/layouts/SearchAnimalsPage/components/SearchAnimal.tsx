import { Link, useNavigate } from "react-router-dom";
import AnimalAlertModel from "../../../models/AnimalAlertModel";
import { isAdminUser } from "../../../Auth/AuthService";
import { deleteAlert, getAllAlerts } from "../../../Auth/AnimalAlertService";
import React, { useEffect, useState } from "react";

export const SearchAnimal: React.FC<{ animalAlert: AnimalAlertModel }> = (props) => {

    const [deleted, setDeleted] = useState<boolean>(false);
    const isAdmin = isAdminUser();
    const navigate = useNavigate();

    async function removeAlert(id: number): Promise<void> {
        try {
            await deleteAlert(id);
            setDeleted(true);
        } catch (error) {
            console.error(error);
        }
    };

    React.useEffect(() => {
        if (deleted) {
            getAllAlerts();
            setDeleted(false);
            window.location.reload();
        }
    }, [deleted]);

    const handleDeleteConfirmation = (id: number) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this alert?");
        if (confirmDelete) {
            removeAlert(id);
        }
    };
    

    return (
        <div className='card mt-3 shadow p-3 mb-3 bg-body rounded'>
            <div className='row g-0'>
                <div className='col-md-2'>
                    <div className='d-none d-lg-block'>
                        {props.animalAlert.picture_url ?
                            <img src={props.animalAlert.picture_url}
                                width='200'
                                height='200'
                                alt='Animal'
                            />
                            :
                            <img src={require('../../../Images/4_cats.jpg')}
                                width='200'
                                height='200'
                                alt='Animal'
                            />
                        }
                    </div>
                    <div className='d-lg-none d-flex justify-content-center 
                        align-items-center'>
                        {props.animalAlert.picture_url ?
                            <img src={props.animalAlert.picture_url}
                                width='200'
                                height='200'
                                alt='Animal'
                            />
                            :
                            <img src={require('../../../Images/4_cats.jpg')}
                                width='200'
                                height='200'
                                alt='Animal'
                            />
                        }
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='card-body'>
                        <h5 className='card-title'>
                            {props.animalAlert.animal.species}
                        </h5>
                        <h4>
                            {props.animalAlert.title}
                        </h4>
                        <p className='card-text'>
                            {props.animalAlert.description}
                        </p>
                    </div>
                </div>
                {
                    isAdmin && 
                    <div className='col-md-4 d-flex justify-content-center align-items-center'>
                    <button className='btn btn-danger' onClick={() => handleDeleteConfirmation(props.animalAlert.id)}>
                        Delete
                    </button>
                </div>
                }
            </div>
        </div>
    );
}