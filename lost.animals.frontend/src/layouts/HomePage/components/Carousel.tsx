import React from 'react';
import { ReturnAnimal } from './ReturnAnimal';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import AnimalAlertModel from '../../../models/AnimalAlertModel';
import { SpinnerLoading } from '../../Utils/SpinnerLoading';

export const Carousel = () => {

    const [animalAlerts, setAnimalAlerts] = useState<AnimalAlertModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchAlerts = async () => {
            const baseUrl: string = "http://localhost:8080/api/animal-alerts/search";

            const url: string = `${baseUrl}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const loadedAlerts: AnimalAlertModel[] = [];

            for (const key in responseJson) {
                loadedAlerts.push({
                    id: responseJson[key].id,
                    title: responseJson[key].title,
                    description: responseJson[key].description,
                    picture_url: responseJson[key].picture_url,
                    last_location: responseJson[key].last_location,
                    animal: responseJson[key].animal
                });
            }

            setAnimalAlerts(loadedAlerts);
            setIsLoading(false);
        };
        fetchAlerts().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, []);

    if (isLoading) {
        return (
            <SpinnerLoading />
        )
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    return (
        <div className='container mt-5' style={{ height: 550 }}>
            <div className='homepage-carousel-title'>
                <h3>Lost animals alerts.</h3>
            </div>
            <div id='carouselExampleControls' className='carousel carousel-dark slide mt-5
                d-none d-lg-block' data-bs-interval='false'>

                {/* Desktop */}

                <div className='carousel-inner'>
                    <div className='carousel-item active'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {animalAlerts.slice(0, 3).map(animalAlert => (
                                <ReturnAnimal animalAlert={animalAlert} key={animalAlert.id} />
                            ))}
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {animalAlerts.slice(3, 6).map(animalAlert => (
                                <ReturnAnimal animalAlert={animalAlert} key={animalAlert.id} />
                            ))}
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {animalAlerts.slice(6, 9).map(animalAlert => (
                                <ReturnAnimal animalAlert={animalAlert} key={animalAlert.id} />
                            ))}
                        </div>
                    </div>
                    <div className='homepage-carousel-title mt-3'>
                        <Link className='btn btn-outline-secondary btn-lg' to='/search'>View More</Link>
                    </div>
                </div>
                <button className='carousel-control-prev' type='button'
                    data-bs-target='#carouselExampleControls' data-bs-slide='prev'>
                    <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                    <span className='visually-hidden'>Previous</span>
                </button>
                <button className='carousel-control-next' type='button'
                    data-bs-target='#carouselExampleControls' data-bs-slide='next'>
                    <span className='carousel-control-next-icon' aria-hidden='true'></span>
                    <span className='visually-hidden'>Next</span>
                </button>
            </div>

            {/* Mobile */}

            <div className='d-lg-none mt-3'>
                <div className='row d-flex justify-content-center align-items-center'>
                    <ReturnAnimal animalAlert={animalAlerts[0]} key={animalAlerts[0].id} />
                </div>
            </div>
            <div className='homepage-carousel-title mt-3'>
                <Link className='btn btn-outline-secondary btn-lg' to='/search'>View More</Link>
            </div>
        </div>
    );
};