import React, { useEffect } from 'react';
import {useForm} from "react-hook-form";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';

import AuthService from '../../services/AuthService';
import DataService from '../../services/DataService';
import { setUserId, setUserEmail, setUserFirstName, setUserLastName } from '../../../redux/actions/userActions'

import './index.scss';

const useLoginForm = ({ setUserId, setUserEmail, setUserFirstName, setUserLastName }) => {
    const { register, errors, handleSubmit } = useForm();
    let history = useHistory();

    useEffect(() => {
        const userIdInLocalStorage = localStorage.getItem('userId') || '';
        const userFirstNameInLocalStorage = localStorage.getItem('firstName') || '';
        const userLastNameInLocalStorage = localStorage.getItem('lastName') || '';
        const email = localStorage.getItem('email') || '';
        console.log('email: ', email);

        if (userIdInLocalStorage !== '') {
            setUserId(userIdInLocalStorage);
            setUserFirstName(userFirstNameInLocalStorage);
            setUserLastName(userLastNameInLocalStorage);
            setUserEmail(email);
            history.push('/');
        };

    }, []);

    const onLogin = (data) => {
        const { email, password } = data;  

        AuthService.login(email, password)
        .then(res => {
            const userId = res.user.uid
            DataService.getUserInfo(userId)
            .then((res) => {
                const { firstName, lastName } = res;
                setUserId(userId);
                setUserEmail(email);
                setUserFirstName(firstName);
                setUserLastName(lastName);
               
                localStorage.setItem('userId', userId);
                localStorage.setItem('email', email);
                localStorage.setItem('firstName', firstName);
                localStorage.setItem('lastName', lastName);
                history.push('/');
            })
        })
    }

    const goToRegister = (e) => {
        e.preventDefault();
        history.push('/register');
    }
    return (
        <div className="login-wrapper">
            <form
                className="login-hook-form"
                onSubmit={handleSubmit(onLogin)}
            >
                <div className="login-form-section">
                    <div className="form-section-title">
                        <p>LOGIN and start jamin'</p>
                    </div>
                    <div className="form-column">
                        <div className="login-block-long">
                            <div className="block-label">
                                <label>Email</label>
                                {errors.email && <div className="field-error">Non valid address</div>}
                            </div>
                            <input
                                name="email"
                                ref={register({ 
                                    required: true,
                                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                })}
                            />
                        </div>
                        <div className="login-block-long">
                            <div className="block-label">
                                <label>Password</label>
                                {errors.password && <div className="field-error">Non valid password</div>}
                            </div>
                            <input
                                name="password" 
                                ref={register({ 
                                required: true,
                                pattern: '',
                                })}
                            />
                        </div>
                    </div>
                </div>
                <div className="hook-form-buttonArea">
                    <input type="submit" />
                </div>
            </form>
            <div className="login-register-area">
                <p>Or if you don't have an account yet, you can register here</p>

                <div className="register-button" onClick={(e) => goToRegister(e)}>
                    <p>REGISTER</p>
                </div>

            </div>
        </div>
    );
};


export default connect(null, { setUserId, setUserEmail, setUserFirstName, setUserLastName })(useLoginForm);