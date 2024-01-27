import { useOktaAuth } from '@okta/okta-react';
import { useState } from 'react';
import AddAnimalAlertRequest from '../../../models/AddAnimalAlertRequest';

class Animal {
    name: string;
    species: string;
    color: string;

    constructor(data: { name: string; species: string; color: string }) {
        this.name = data.name;
        this.species = data.species;
        this.color = data.color;
    }
}


export const AddAnimalAlert = () => {

    const { authState } = useOktaAuth();

    // New Animal

    const [name, setName] = useState('');
    const [species, setSpecies] = useState('Species');
    const [color, setColor] = useState('');


    // New Animal Alert

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [pictureUrl, setPictureUrl] = useState<any>(null)
    const [chipNumber, setChipNumber] = useState('');
    const [lastLocation, setLastLocation] = useState('');
    const [animal, setAnimal] = useState<Animal | null>(null)

    // Displays
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    function speciesField(value: string) {
        setSpecies(value);
    }

    async function base64ConversionForImages(e: any) {
        if (e.target.files[0]) {
            getBase64(e.target.files[0]);
        }
    }

    function getBase64(file: any) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setPictureUrl(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error', error);
        }
    }

    async function submitNewAlert() {
        try{
            const url: string = `http://localhost:8080/api/animal-alerts/secure/createAlerts`;
            if (title !== '' && name !== '' && color !== '' && species !== 'Species' && chipNumber !== '' && lastLocation !== ''
                && description !== '') {
                    const newAnimal = new Animal({name, species, color});
                    setAnimal(newAnimal);
                    const animalAlert: AddAnimalAlertRequest = new AddAnimalAlertRequest(newAnimal, title, description, chipNumber, lastLocation);
                    animalAlert.picture_url = pictureUrl;
                    const requestOptions = {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        body: JSON.stringify(animalAlert)
                    };
    
                    const submitNewAlertResponse = await fetch(url, requestOptions);
    
                    if (!submitNewAlertResponse.ok) {
                        throw new Error('Something went wrong!');
                    }
                    setTitle('');
                    setName('');
                    setColor('');
                    setSpecies('Species');
                    setChipNumber('');
                    setLastLocation('');
                    setDescription('');
                    setPictureUrl(null);
                    setAnimal(null);
                    setDisplaySuccess(true);
                } else {
                    setDisplayWarning(true);
                    setDisplaySuccess(false);
                }
        } catch (error) {
            console.error('Error in submitNewAlert:', error);
            setDisplayWarning(true);
            setDisplaySuccess(false);
        }
        
    }

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
                    <form method='POST'>
                        <div className='row'>
                            <div className='col-md-6 mb-3'>
                                <label className='form-label'>Title</label>
                                <input type="text" className='form-control' name='title' required 
                                    onChange={e => setTitle(e.target.value)} value={title} />
                            </div>
                            <div className='col-md-3 mb-3'>
                                <label className='form-label'> Name </label>
                                <input type="text" className='form-control' name='name' required 
                                    onChange={e => setName(e.target.value)} value={name}/>
                            </div>
                            <div className='col-md-3 mb-3'>
                                <label className='form-label'> Color </label>
                                <input type="text" className='form-control' name='color' required 
                                    onChange={e => setColor(e.target.value)} value={color}/>
                            </div>
                            <div className='col-md-3 mb-3'>
                                <label className='form-label'> Species</label>
                                <button className='form-control btn btn-secondary dropdown-toggle' type='button' 
                                    id='dropdownMenuButton1' data-bs-toggle='dropdown' aria-expanded='false'>
                                        {species}
                                </button>
                                <ul id='addNewAlertId' className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                    <li><a onClick={() => speciesField('Dog')} className='dropdown-item'>Dog</a></li>
                                    <li><a onClick={() => speciesField('Cat')} className='dropdown-item'>Cat</a></li>
                                    <li><a onClick={() => speciesField('Bird')} className='dropdown-item'>Bird</a></li>
                                    <li><a onClick={() => speciesField('Fish')} className='dropdown-item'>Fish</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-md-3 mb-3'>
                                <label className='form-label'> Chip Number </label>
                                <input type="text" className='form-control' name='chipNumber' required 
                                    onChange={e => setChipNumber(e.target.value)} value={chipNumber}/>
                        </div>
                        <div className='col-md-3 mb-3'>
                                <label className='form-label'> Last Known Location </label>
                                <input type="text" className='form-control' name='lastLocation' required 
                                    onChange={e => setLastLocation(e.target.value)} value={lastLocation}/>
                        </div>
                        <div className='col-md-12 mb-3'>
                            <label className='form-label'>Description</label>
                            <textarea className='form-control' id='FormControlTextarea1' rows={3} 
                                onChange={e => setDescription(e.target.value)} value={description}></textarea>
                        </div>
                        <input type='file' onChange={e => base64ConversionForImages(e)}/>
                        <div>
                            <button type='button' className='btn btn-primary mt-3' onClick={submitNewAlert}>
                                Create Alert
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}