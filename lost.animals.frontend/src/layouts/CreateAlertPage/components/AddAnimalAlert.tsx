import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { saveAlert } from '../../../Auth/AnimalAlertService';
import { getLoggedInUser } from '../../../Auth/AuthService';
import Compressor from 'image-compressor';

export const AddAnimalAlert = () => {

    const [alertData, setAlertData] = useState({
        title: '',
        description: '',
        image: '',
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

    const handleImage = async (e) => {

        const file = e.target.files[0];
        if (!file) return;

        try {
            const compressedFile = await new Compressor(file, {
                quality: 0.6, // Adjust quality as needed (0.6 is just an example)
                maxWidth: 800, // Maximum width of the resized image
                maxHeight: 800, // Maximum height of the resized image
                mimeType: 'image/jpeg' // Output image format
            });

            const reader = new FileReader();
            reader.readAsDataURL(compressedFile);
            reader.onload = () => {
                const result = reader.result;
                setAlertData(prevState => ({ ...prevState, image: result as string }));
            };
        } catch (error) {
            console.error('Error compressing image:', error);
        }
        
        // const reader = new FileReader();
        // reader.readAsDataURL(e.target.files[0]);
        // reader.onload = () => {
        //     //console.log(reader.result);
        //     const result = reader.result;
        //     setAlertData(prevState => ({ ...prevState, [e.target.name]: result }));
        // };
        // reader.onerror = error => {
        //     console.log("Error: ", error);
        // };
    };


    const saveNewAlert = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        saveAlert(alertData).then((response) => {
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
                                    name='image'
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