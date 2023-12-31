import { useEffect, useState } from 'react';
import AnimalAlertModel from '../../models/AnimalAlertModel';
import { SpinnerLoading } from '../Utils/SpinnerLoading';
import { SearchAnimal } from './components/SearchAnimal';
import { Pagination } from '../Utils/Pagination';

export const SearchAnimalsPage = () => {

    const [animals, setAnimals] = useState<AnimalAlertModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [animalsPerPage] = useState(5);
    const [totalAmountOfAnimals, setTotalAmountOfAnimals] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');
    const [searchUrl, setSearchUrl] = useState('');
    const [speciesSelection, setSpeciesSelection] = useState('Animal Species');

    useEffect(() => {
        const fetchAlerts = async () => {
            const baseUrl: string = "http://localhost:8080/api/animal-alerts/search";

            let url: string = '';

            if (searchUrl === '') {
                url = baseUrl + '/findAll';
            } else {
                url = baseUrl + searchUrl;
            }
            console.log(url);

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            setTotalAmountOfAnimals(responseJson.length);

            // if (responseJson.length % 5 === 0) {
            //     setTotalPages(Math.floor(responseJson.length / 5));
            // } else {
            //     setTotalPages(Math.floor(responseJson.length / 5) + 1);
            // }

            const loadedAlerts: AnimalAlertModel[] = [];

            for (const key in responseJson) {
                loadedAlerts.push({
                    id: responseJson[key].id,
                    title: responseJson[key].title,
                    description: responseJson[key].description,
                    picture_url: responseJson[key].picture_url,
                    chip_number: responseJson[key].chip_number,
                    last_location: responseJson[key].last_location,
                    animal: responseJson[key].animal
                });
            }

            setAnimals(loadedAlerts);
            setIsLoading(false);
        };
        fetchAlerts().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
        window.scrollTo(0, 0);
    }, [currentPage, searchUrl]);

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

    const searchHandleChange = () => {
        if (search === '') {
            setSearchUrl('');
        } else {
            setSearchUrl(`/findByTitle?title=${search}`);
        }
    }

    const speciesField = (value: string) => {
        if (
            value.toLowerCase() === 'dog' || 
            value.toLowerCase() === 'cat' || 
            value.toLowerCase() === 'bird' || 
            value.toLowerCase() === 'fish'
        ) {
            setSpeciesSelection(value);
            setSearchUrl(`/findBySpecies?species=${value}`);
        } else {
            setSpeciesSelection('All');
            setSearchUrl('');
        }
    }

    const indexOfLastAnimal: number = currentPage * animalsPerPage;
    const indexOfFirstAnimal: number = indexOfLastAnimal - animalsPerPage;
    let lastItem = animalsPerPage * currentPage <= totalAmountOfAnimals ?
                                          animalsPerPage * currentPage : totalAmountOfAnimals;

    //const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className='container'>
                <div>
                    <div className='row mt-5'>
                        <div className='col-6'>
                            <div className='d-flex'>
                                <input className='form-control me-2' type='search'
                                    placeholder='Search' aria-labelledby='Search'
                                    onChange={e => setSearch(e.target.value)} />
                                <button className='btn btn-outline-success'
                                    onClick={() => searchHandleChange()}>
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='dropdown'>
                                <button className='btn btn-secondary dropdown-toggle' type='button'
                                    id='dropdownMenuButton1' data-bs-toggle='dropdown'
                                    aria-expanded='false'>
                                    {speciesSelection}
                                </button>
                                <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                    <li onClick={() => speciesField('All')}>
                                        <a className='dropdown-item' href='#'>
                                            All
                                        </a>
                                    </li>
                                    <li onClick={() => speciesField('Dog')}>
                                        <a className='dropdown-item' href='#'>
                                            Dog
                                        </a>
                                    </li>
                                    <li onClick={() => speciesField('Cat')}>
                                        <a className='dropdown-item' href='#'>
                                            Cat
                                        </a>
                                    </li>
                                    <li onClick={() => speciesField('Bird')}>
                                        <a className='dropdown-item' href='#'>
                                            Bird
                                        </a>
                                    </li>
                                    <li onClick={() => speciesField('Fish')}>
                                        <a className='dropdown-item' href='#'>
                                            Fish
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {totalAmountOfAnimals > 0 ?
                        <>
                            <div className='mt-3'>
                                <h5>Number of results: ({totalAmountOfAnimals})</h5>
                            </div>
                            <p>
                                {indexOfFirstAnimal + 1} to {lastItem} of {totalAmountOfAnimals} items:
                            </p>
                            {animals.map(animal => (
                                <SearchAnimal animalAlert={animal} key={animal.id} />
                            ))}
                        </>
                        :
                        <div className='m-5'>
                            <h3>
                                Can't find what you are looking for?
                            </h3>
                            <a type='button' className='btn main-color btn-md px-4 me-md-2 fw-bold text-white'
                                href='#'>Support</a>
                        </div>
                    }
                    {/* {totalPages > 1 &&
                        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
                    } */}
                </div>
            </div>
        </div>
    );
}