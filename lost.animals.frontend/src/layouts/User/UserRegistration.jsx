import React, { useState } from "react";
import { registerAPICall } from "../../Auth/AuthService";

const UserRegistration = () => {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

        const register = {name, surname, email, password};

        console.log(register);

        registerAPICall(register)
        .then((response) => {
            console.log(response.data);
        }).catch(error => {
            console.error('Error during API call:', error);
        })

        navigator('/');
    } 

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="container">
            <div className="mt-5">
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
                                            <input type="text" name="name" className="form-control" value={name} onChange={ (e) => setName(e.target.value) }></input>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label className="col-md-3 control-label">Surname</label>
                                        <div className="col-md-9 input-group">
                                            <input type="text" name="surname" className="form-control" value={surname} onChange={ (e) => setSurname(e.target.value) }></input>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label className="col-md-3 control-label">Email</label>
                                        <div className="col-md-9 input-group">
                                            <input type="text" name="email" className="form-control" value={email} onChange={ (e) => setEmail(e.target.value) }></input>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label className="col-md-3 control-label">Password</label>
                                        <div className="col-md-9 input-group">
                                            <input type={showPassword ? 'text' : 'password'} name="password" className="form-control" value={password} onChange={ (e) => setPassword(e.target.value) }></input>
                                            <div className="input-group-append">
                                                <button type="button" onClick={toggleShowPassword} className="btn btn-outline-secondary">{showPassword ? 'Hide' : 'Show'}</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label className="col-md-3 control-label">Confirm Password</label>
                                        <div className="col-md-9 input-group">
                                            <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" className="form-control" value={confirmPassword} onChange={ (e) => setConfirmPassword(e.target.value) }></input>
                                            <div className="input-group-append">
                                                <button type="button" onClick={toggleShowConfirmPassword} className="btn btn-outline-secondary">{showConfirmPassword ? 'Hide' : 'Show'}</button>
                                            </div>
                                        </div>
                                    </div>

                                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                                    
                                    <div className="form-group mb-9">
                                        <button className="btn main-color" onClick={ (e) => registerUser(e) }>Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default UserRegistration;