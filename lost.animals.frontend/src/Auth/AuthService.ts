import axios from "axios";

const base_url = 'http://localhost:8080/api/auth';

const findUserByEmailUrl = 'http://localhost:8080/api/user/findUser?email='

export const registerAPICall = (registerObj) => axios.post(base_url + '/register', registerObj);

export const findUserByEmail = (email) => axios.get(findUserByEmailUrl + email);

export const loginAPICall = (email, password) => axios.post(base_url + '/login', { email, password});

export const storeToken = (token) => localStorage.setItem('token', token);

export const getToken = () => localStorage.getItem('token');

export const saveLoggedInUser = (email, role) => {
    sessionStorage.setItem('authenticatedUser', email);
    sessionStorage.setItem('role', role);
}

export const isUserLoggedIn = () => {

    const email = sessionStorage.getItem('authenticatedUser');

    if(email == null) {
        return false;
    }    
    else {
        return true;
    }   
}

export const getLoggedInUser = () => {
    const email = sessionStorage.getItem('authenticatedUser');
    return email;
}

export const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
}

export const isAdminUser = () => {
    let role = sessionStorage.getItem('role');

    if (role != null && role === 'ROLE_ADMIN') {
        return true;
    } 
    else {
        return false;
    }
}