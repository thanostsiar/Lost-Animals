import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { saveAlert } from '../../../Auth/AnimalAlertService';
import { getLoggedInUser, isAdminUser } from '../../../Auth/AuthService';
import Compressor from 'image-compressor';

interface AlertData {
    title: string;
    description: string;
    imageFile: File | null; // Define the type of imageFile
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
        imageFile: null,
        chipNumber: '',
        lastLocation: '',
        name: '',
        species: '',
        color: '',
        userEmail: ''

    });

    const navigate = useNavigate();

    useEffect(() => {
        const email = getLoggedInUser();
        if (email) {
            setAlertData(prevState => ({ ...prevState, userEmail: email }));
            console.log(email)
        }
    }, []);


    const handleChangeElement = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setAlertData(prevState => ({ ...prevState, [name]: value }));
    };



    const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAlertData({ ...alertData, [e.target.name]: e.target.value });
    };

    const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAlertData({ ...alertData, imageFile: e.target.files[0] });
        }

        // if (e.target.files && e.target.files[0]) {
        //     const file = e.target.files[0];
        //     try {
        //         const compressedFile = await new Compressor(file, {
        //             quality: 0.6, // Adjust quality as needed (0.6 is just an example)
        //             maxWidth: 800, // Maximum width of the resized image
        //             maxHeight: 800, // Maximum height of the resized image
        //             mimeType: 'image/jpeg' // Output image format
        //         });
        //         const reader = new FileReader();
        //         reader.readAsDataURL(compressedFile);
        //         reader.onload = () => {
        //             const result = reader.result as string;
        //             setAlertData({ ...alertData, imageFile: result });
        //         };
        //     } catch (error) {
        //         console.error('Error compressing image:', error);
        //     }
        // }

        // if (e.target.files && e.target.files[0]) {
        //     const file = e.target.files[0];
        //     const reader = new FileReader();
        //     reader.onload = () => {
        //         const base64Data = reader.result?.toString();
        //         if (base64Data) {
        //             setAlertData({ ...alertData, imageFile: base64Data });
        //         }
        //     };
        //     reader.readAsDataURL(file);
        // }
    };

    const saveNewAlert = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData();
        // formData.append('title', alertData.title);
        // formData.append('description', alertData.description);
        // if (alertData.imageFile) {
        //     formData.append('imageFile', alertData.imageFile);
        // }
        // formData.append('chipNumber', alertData.chipNumber);
        // formData.append('lastLocation', alertData.lastLocation);
        // formData.append('name', alertData.name);
        // formData.append('species', alertData.species);
        // formData.append('color', alertData.color);
        // formData.append('userEmail', alertData.userEmail);
        const json = JSON.stringify(alertData);
        //formData.append('alert', json);
        const blob = new Blob([json], {
            type: 'application/json'
          });
        formData.append('alert', blob);
        if (alertData.imageFile) {
            formData.append('imageFile', alertData.imageFile);
        }

        console.log(formData.get('alert'));
        console.log(formData.get('imageFile'));

        saveAlert(formData).then((response) => {
            console.log(response.data)
            navigate('/')
        }).catch(error => {
            console.error(error);
        })

    };
    

    return (
        <div className='container'>
            <br /> <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h2 className='text-center'>Add Alert</h2>
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
        </div>
    );
};