/*eslint-disable*/

import axios from 'axios';

import { showAlert } from './alerts';

export const signup = async (
    name,
    email,
    password,
    passwordConfirm,
    phoneNumber
) => {
    try {
        console.log('reached here2!');
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:8000/api/users/signup',
            data: {
                name,
                email,
                password,
                passwordConfirm,
                phoneNumber,
            },
        });
        showAlert('success', 'Signed up successfully');
        window.setTimeout(() => {
            location.assign('/');
        }, 1000);
    } catch (err) {
        showAlert(
            'error',
            'User with the same email or phone number already exists!'
        );
    }
};
