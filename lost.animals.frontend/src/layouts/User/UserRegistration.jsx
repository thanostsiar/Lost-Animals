import React, { useState } from "react";
import { findUserByEmail, registerAPICall } from "../../Auth/AuthService";
import { Link, useNavigate } from "react-router-dom";

const UserRegistration = () => {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordValidations, setPasswordValidations] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false
    });
    const navigator = useNavigate();

    const validatePassword = (value) => {
        const validations = {
            length: value.length >= 6,
            uppercase: /[A-Z]/.test(value),
            lowercase: /[a-z]/.test(value),
            number: /\d/.test(value),
            specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value)
        };

        setPasswordValidations(validations);

        // Check if all validations are true
        for (const key in validations) {
            if (!validations[key]) {
                return false;
            }
        }
        return true;
    };

    const handlePasswordChange = (value) => {
        setPassword(value);
        validatePassword(value);
    };


    function registerUser(e) {

        e.preventDefault();

        // Check if all fields are filled
        if (!name || !surname || !email || !password || !confirmPassword) {
            setError('Please fill in all fields!');
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        // Check if email format is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address!');
            return;
        }

        // Check if password format is valid
        if (!validatePassword(password)) {
            setError('Please input the correct format for the password field!');
            return;
        }

        findUserByEmail(email)
            .then(setError('User with this email already exists!'))
            .catch(error => {
                console.error('Error during API call:', error)
            })

        const register = { name, surname, email, password };

        registerAPICall(register)
            .then((response) => {
                navigator('/login');
            }).catch(error => {
                console.error('Error during API call:', error);
            })

    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="container">
            <br></br>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="text-center">User Registration</h2>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="row mb-3">
                                    <label className="col-md-3 control-label">Name</label>
                                    <div className="col-md-9 input-group">
                                        <input type="text" name="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)}></input>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-md-3 control-label">Surname</label>
                                    <div className="col-md-9 input-group">
                                        <input type="text" name="surname" className="form-control" value={surname} onChange={(e) => setSurname(e.target.value)}></input>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-md-3 control-label">Email</label>
                                    <div className="col-md-9 input-group">
                                        <input type="text" name="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-md-3 control-label">Password</label>
                                    <div className="col-md-9 input-group">
                                        <input type={showPassword ? 'text' : 'password'} name="password" className="form-control" value={password} onChange={(e) => handlePasswordChange(e.target.value)}></input>
                                        <div className="input-group-append">
                                            <button type="button" onClick={toggleShowPassword} className="btn btn-outline-secondary">{showPassword ? 'Hide' : 'Show'}</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-md-3 control-label">Confirm Password</label>
                                    <div className="col-md-9 input-group">
                                        <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
                                        <div className="input-group-append">
                                            <button type="button" onClick={toggleShowConfirmPassword} className="btn btn-outline-secondary">{showConfirmPassword ? 'Hide' : 'Show'}</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-3"></div>
                                    <div className="col-md-9 input-group">
                                        <ul>
                                            <li className={passwordValidations.length ? 'text-success' : 'text-danger'}>
                                                At least 6 characters long
                                            </li>
                                            <li className={passwordValidations.uppercase ? 'text-success' : 'text-danger'}>
                                                At least one uppercase letter
                                            </li>
                                            <li className={passwordValidations.lowercase ? 'text-success' : 'text-danger'}>
                                                At least one lowercase letter
                                            </li>
                                            <li className={passwordValidations.number ? 'text-success' : 'text-danger'}>
                                                At least one number
                                            </li>
                                            <li className={passwordValidations.specialChar ? 'text-success' : 'text-danger'}>
                                                At least one special character
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {error && <div className="alert alert-danger" role="alert">{error}</div>}

                                <div className="form-group mb-9">
                                    <button className="btn main-color" onClick={(e) => registerUser(e)}>Submit</button>
                                </div>

                                <div className="text-center">
                                    <p>Already have an account? <Link type="text" style={{ color: '#12330f' }} to="/login">Login</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
        </div>
    );

};

export default UserRegistration;