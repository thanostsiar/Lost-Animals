import { useState } from 'react';
import AddAnimalAlertRequest from '../../../models/AddAnimalAlertRequest';
import axios from 'axios';


export const AddAnimalAlert = () => {

    const [alertDetails, setAlertDetails] = useState({
        title: '',
        description: '',
        // Assuming the image will be handled as a URL or base64 string
        image: '',
        lastKnownLocation: '',
        animal: {
            name: '',
            color: '',
            species: '',
            owner: {
                firstName: '',
                lastName: '',
            },
        },
    });


    // Displays
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    const handleChange = (e) => {
        if (e.target.name.startsWith("animal.")) {
            // Nested animal and owner updates
            let path = e.target.name.split(".");
            setAlertDetails(current => {
                let newState = { ...current };
                let target = newState;
                for (let i = 0; i < path.length - 1; i++) {
                    target = target[path[i]];
                }
                target[path[path.length - 1]] = e.target.value;
                return newState;
            });
        } else if (e.target.type === 'file') {
            // Handle file input for the image, converting to base64
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setAlertDetails({ ...alertDetails, image: reader.result!.toString() });
                };
                reader.readAsDataURL(file);
            }
        } else {
            setAlertDetails({ ...alertDetails, [e.target.name]: e.target.value });
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/animal-alerts/createAlert', alertDetails);
            console.log('Alert created:', response.data);
        } catch (error) {
            console.error('Error creating alert:', error);
        }
    };

    return (
        <div className='container mt-5 mb-5'>
            {displaySuccess &&
                <div className='alert alert-success' role='alert'>
                    Alert created successfully!
                </div>
            }
            {displayWarning &&
                <div className='alert alert-danger' role='alert'>
                    All fields must be filled out!
                </div>
            }
            <div className='card'>
                <div className='card-header'>
                    Create alert
                </div>
                <div className='card-body'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="title">Title:</label>
                            <input type="text" id="title" name="title" value={alertDetails.title} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="description">Description:</label>
                            <textarea id="description" name="description" value={alertDetails.description} onChange={handleChange}></textarea>
                        </div>
                        <div>
                            <label htmlFor="image">Image:</label>
                            <input type="file" id="image" name="image" value={alertDetails.image} onChange={handleChange} accept="image/*"/>
                        </div>
                        <div>
                            <label htmlFor="lastKnownLocation">Last Known Location:</label>
                            <input type="text" id="lastKnownLocation" name="lastKnownLocation" value={alertDetails.lastKnownLocation} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="animal.color">Animal Color:</label>
                            <input type="text" id="animal.color" name="animal.color" value={alertDetails.animal.color} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="animal.name">Animal Name:</label>
                            <input type="text" id="animal.name" name="animal.name" value={alertDetails.animal.name} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="animal.species">Species:</label>
                            <input type="text" id="animal.species" name="animal.species" value={alertDetails.animal.species} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="animal.owner.firstName">Owner First Name:</label>
                            <input type="text" id="animal.owner.firstName" name="animal.owner.firstName" value={alertDetails.animal.owner.firstName} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="animal.owner.lastName">Owner Last Name:</label>
                            <input type="text" id="animal.owner.lastName" name="animal.owner.lastName" value={alertDetails.animal.owner.lastName} onChange={handleChange} />
                        </div>
                        <button type="submit">Create Alert</button>
                    </form>
                </div>
            </div>
        </div>
    )
}