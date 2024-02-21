import React, { useState } from 'react';
import { loginAPICall, saveLoggedInUser, storeToken } from "../../Auth/AuthService";
import { Link, useNavigate } from 'react-router-dom';


const UserLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigator = useNavigate();

    async function handleLoginForm(e) {

        e.preventDefault();

        if (!email || !password) {
            setError('Please fill in all fields!');
            return;
        }

        try {
            await loginAPICall(email, password).then((response) => {
                console.log(response.data);

                const token = 'Bearer ' + response.data.accessToken;
                const role = response.data.role;

                storeToken(token);

                saveLoggedInUser(email, role);
                navigator('/')

                window.location.reload();
            }).catch(error => {
                console.error(error);
                setError('Invalid email or/and password.');
            })
        }
        catch (error) {
            console.error(error);
        }
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='container'>
            <br /> <br />
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <div className='card'>
                        <div className='card-header'>
                            <h2 className='text-center'> Login Form </h2>
                        </div>

                        <div className='card-body'>
                            <form>

                                <div className='row mb-3'>
                                    <label className='col-md-3 control-label'>Email</label>
                                    <div className='col-md-9 input-group'>
                                        <input
                                            type='text'
                                            name='email'
                                            className='form-control'
                                            value={email}
                                            required={true}
                                            onChange={(e) => setEmail(e.target.value)}
                                        >
                                        </input>
                                    </div>
                                </div>

                                <div className='row mb-3'>
                                    <label className='col-md-3 control-label'>Password </label>
                                    <div className='col-md-9 input-group'>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name='password'
                                            className='form-control'
                                            value={password}
                                            required={true}
                                            onChange={(e) => setPassword(e.target.value)}
                                        >
                                        </input>
                                        <div className="input-group-append">
                                            <button type="button" onClick={toggleShowPassword} className="btn btn-outline-secondary">{showPassword ? 'Hide' : 'Show'}</button>
                                        </div>
                                    </div>
                                </div>

                                {error && <div className="alert alert-danger" role="alert">{error}</div>}

                                <div className='form-group mb-3'>
                                    <button className='btn main-color' onClick={(e) => handleLoginForm(e)}>Submit</button>
                                </div>

                                <div className="text-center">
                                        <p>Don't have an account? <Link type="text" style={{color: '#12330f'}} to="/register">Register</Link></p>
                                    </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;