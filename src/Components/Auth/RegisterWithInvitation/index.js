import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { useHistory } from "react-router-dom";
import {useForm} from "react-hook-form";
import { setJamId, setSection, setSubSection } from '../../../redux/actions/navigateActions.js'

import AuthService from '../../services/AuthService'
import DataService from '../../services/DataService';

import './index.scss';
import { setUserId, setUserName } from '../../../redux/actions/userActions.js';

const RegisterWithInvitation = ({jamId, jamName, adminName, firstName, setJamId, setSection, setSubSection, setUserId, setUserName }) => {
  
  const [jamInfo, setJamInfo] = useState({});

  useEffect(() => {
    jamId && DataService.getJamInfoById(jamId)
    .then((data) => {
      console.log('data = ', data);
      setJamInfo(data);
    });
  }, [jamId])

  let history = useHistory();

  const { register, errors, getValues, handleSubmit } = useForm();

  const onSubmit = (data) => {

    const {firstName, lastName, email, password } = data;
    
    DataService.checkIfEmialExists(email)
    .then(exists => {
      if (exists === true) {
        alert('el email ya existe')
        return;
      } else {

        AuthService.registerWithInvitation(firstName, lastName, email, password, jamId, jamInfo)
        .then(res => {
          const userId = res.user.uid;
          setJamId(jamId);
          setUserId(userId);
          setUserName(firstName);
          setSection('overview');
          setSubSection('');
          history.push(`/`);
        });
      }
    })
  };

  return (
    <form
      className="register-hook-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="register-form-section">
          <div className="register-form-section-title">
            <p>Hello {firstName} !<p>
            <p>{adminName} has invite you to join to {jamName}</p>
            </p>Please register to Jammint and we'll take you there</p>
          </div>
          <div className="register-form-line">
              <div className="custom-input-block">
                  <div className="block-label">
                      <label>First name</label>
                      {errors.firstName && <div className="field-error">Required</div>}
                  </div>
                  <input
                      name="firstName"
                      ref={register({
                          required: true,
                      })}
                  />
              </div>
              <div className="custom-input-block">
                  <div className="block-label">
                      <label>Last name</label>
                      {errors.lastName && <div className="field-error">Required</div>}
                  </div>
                  <input
                      name="lastName"
                      ref={register({ 
                          required: true,
                      })}
                  />
              </div>
          </div>
          <div className="form-line">
              <div className="custom-input-block">
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
              <div className="register-block-long">
                <div className="block-label">
                    <label>Confirm Password</label>
                    {errors.confirmPassword && <div className="field-error">{errors.confirmPassword.message}</div>}
                </div>
                <input
                  name="confirmPassword" 
                  ref={register({ 
                    required: true,
                    pattern: '',
                    validate: {
                      matchesPreviousPassword: value => {
                        const { password } = getValues();
                        return password === value || "Passwords should match!";
                      }
                    }
                  })}
                />
            </div>
      </div>
      <div className="hook-form-buttonArea">
          <input type="submit" />
      </div>
    </form>
  );
};


export default connect (null, {setUserId, setUserName, setJamId, setSection, setSubSection })(RegisterWithInvitation);