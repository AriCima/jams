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
               
                console.log('email: ', email);
                localStorage.setItem('userId', userId);
                localStorage.setItem('email', email);
                localStorage.setItem('firstName', firstName);
                localStorage.setItem('lastName', lastName);
                history.push('/');
            })
        })
    }

    return (

        <form
            className="register-hook-form"
            onSubmit={handleSubmit(onLogin)}
        >
        <div className="register-form-section">
            <div className="form-section-title">
                <p>LOGIN and start jamin'</p>
            </div>
            <div className="form-column">
                <div className="register-block-long">
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
                <div className="register-block-long">
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
    );
};


export default connect(null, { setUserId, setUserEmail, setUserFirstName, setUserLastName })(useLoginForm);