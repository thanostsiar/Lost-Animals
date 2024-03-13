import { useEffect, useState } from 'react';
import { saveAlert } from '../../../Auth/AnimalAlertService';
import { getLoggedInUser } from '../../../Auth/AuthService';

interface AlertData {
    title: string;
    description: string;
    imagePath: File | null;
    chipNumber: string;
    lastLocation: string;
    name: string;
    species: string;
    color: string;
    userEmail: string;
}

export const AddAnimalAlert = () => {

    const [alertData, setAlertData] = useState<AlertData>({
        title: '',
        description: '',
        imagePath: null,
        chipNumber: '',
        lastLocation: '',
        name: '',
        species: '',
        color: '',
        userEmail: ''

    });

    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    useEffect(() => {
        const email = getLoggedInUser();
        if (email) {
            setAlertData(prevState => ({ ...prevState, userEmail: email }));
        }
    }, []);

    const resetFormFields = () => {
        setAlertData({
            title: '',
            description: '',
            imagePath: null,
            chipNumber: '',
            lastLocation: '',
            name: '',
            species: '',
            color: '',
            userEmail: getLoggedInUser() || ''
        });
    };


    const handleChangeElement = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setAlertData(prevState => ({ ...prevState, [name]: value }));
    };



    const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAlertData({ ...alertData, [e.target.name]: e.target.value });
    };

    const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAlertData({ ...alertData, imagePath: e.target.files[0] });
        }
    };


    const saveNewAlert = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData();
        const json = JSON.stringify(alertData);
        const blob = new Blob([json], {
            type: 'application/json'
        });
        formData.append('alert', blob);
        if (alertData.imagePath) {
            formData.append('imagePath', alertData.imagePath);
        }

        saveAlert(formData).then((response) => {
            setDisplaySuccess(true);
            setDisplayWarning(false);
            resetFormFields();
        }).catch(error => {
            setDisplayWarning(true);
            setDisplaySuccess(false);
        })
    };


    return (
        <div className='container'>
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
                <br /> <br />
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <h2 className='text-center'>Alert Form</h2>
                        <div className='card-body'>
                            <form onSubmit={saveNewAlert}>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Title:</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='title'
                                        value={alertData.title}
                                        onChange={handleChangeElement}
                                    >
                                    </input>
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Description:</label>
                                    <textarea
                                        className='form-control'
                                        name='description'
                                        value={alertData.description}
                                        onChange={handleChangeTextArea}
                                    >
                                    </textarea>
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Image:</label>
                                    <input
                                        type='file'
                                        className='form-control'
                                        name='imageFile'
                                        accept='image/*'
                                        onChange={handleImage}
                                    >
                                    </input>
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Chip Number:</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='chipNumber'
                                        value={alertData.chipNumber}
                                        onChange={handleChangeElement}
                                    >
                                    </input>
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Last Known Location:</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='lastLocation'
                                        value={alertData.lastLocation}
                                        onChange={handleChangeElement}
                                    >
                                    </input>
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Pet Name:</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='name'
                                        value={alertData.name}
                                        onChange={handleChangeElement}
                                    >
                                    </input>
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Species:</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='species'
                                        value={alertData.species}
                                        onChange={handleChangeElement}
                                    >
                                    </input>
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Color:</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='color'
                                        value={alertData.color}
                                        onChange={handleChangeElement}
                                    >
                                    </input>
                                </div>

                                <button className='btn main-color'>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                <br></br>
            </div>
        </div>
    );
};