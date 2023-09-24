/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {
    console.log('reached here');
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:8000/api/users/login',
            data: {
                email,
                password,
            },
        });
        if (res.data.status === 'success') {
            console.log('logged in successfully!');
            showAlert('success', 'Logged in successfully');
            window.setTimeout(() => {
                location.assign('/');
            }, 1500);
        }
    } catch (err) {
        console.log(err.response.data);
        showAlert('error', 'Incorrect password or email. Please try again');
    }
};

export const logout = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: '/api/users/logout',
        });

        if ((res.data.status = 'success')) {
            //reloading after logging out
            location.assign('/');
        }
    } catch (err) {
        console.log(err.response);
        showAlert('error', 'Error logging out. Try again');
    }
};
