import { Link } from "react-router-dom";
import AnimalAlertModel from "../../../models/AnimalAlertModel";

export const SearchAnimal: React.FC<{ animalAlert: AnimalAlertModel }> = (props) => {
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
                {/* <div className='col-md-4 d-flex justify-content-center align-items-center'>
                    <Link className='btn btn-md main-color text-white' to={`/checkout/${props.animalAlert.id}`}>
                        View
                    </Link>
                </div> */}
            </div>
        </div>
    );
}