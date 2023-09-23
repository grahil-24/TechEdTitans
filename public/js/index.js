/*eslint-disable*/
import { login } from './login';
import { signup } from './signup';

const loginForm = document.querySelector('.form-login');
const signupForm = document.querySelector('.form-signup');

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        console.log(email);
        console.log(password);
        login(email, password);
    });
}

if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('reached here!');
        const name = document.getElementById('name').value;
        const email = document.getElementById('email-signup').value;
        const password = document.getElementById('password-signup').value;
        const passwordConfirm =
            document.getElementById('passwordConfirm').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        console.log(name, email, password, passwordConfirm, phoneNumber);
        signup(name, email, password, passwordConfirm, phoneNumber);
    });
}
