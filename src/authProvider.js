import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin';
import axios from 'axios';


export default (type, params) => {
    // called when the user attempts to log in
    if (type === AUTH_LOGIN) {
        const { username, password } = params;

        localStorage.setItem('username', username);
        localStorage.setItem('password', password);

        const login = new Promise((resolve,reject) => {
            axios.post('http://sistemadeventas.com.ar:8080', {
                "id": 1,
                "token": {
                    "database": "test",
                    "username": username,
                    "password": password
                },
                "model": "res.users",
                "params": [
                    "test",
                    username,
                    password,
                    []
                ],
                "method": "authenticate"
            }).then(response => response.data == true ? resolve(): reject());
        })
       
        return login;
    }
    // called when the user clicks on the logout button
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('username');
        return Promise.resolve();
    }
    // called when the API returns an error
    if (type === AUTH_ERROR) {
        const { status } = params;
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            return Promise.reject();
        }
        return Promise.resolve();
    }
    // called when the user navigates to a new location
    if (type === AUTH_CHECK) {
        return localStorage.getItem('username')
            ? Promise.resolve()
            : Promise.reject();
    }
    return Promise.reject('Unknown method');
};