import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { useHistory } from "react-router-dom";
import {useForm} from "react-hook-form";
import { setJamId, setSection, setSubSection } from '../../../redux/actions/navigateActions.js'

import AuthService from '../../services/AuthService'
import DataService from '../../services/DataService';

import './index.scss';
import { setUserId, setUserRole } from '../../../redux/actions/userActions.js';

const RegisterWithInvitation = ({jamId, userId, invId, firstName, setJamId, setSection, setSubSection, setUserId, setUserRole }) => {
  console.log('firstName: ', firstName);
  const [passwordError, setPasswordError] = useState(false);
  const [jamInfo, setJamInfo] = useState({});


  useEffect(() => {
    jamId && DataService.getJamInfoById(jamId)
    .then(res => {
      setJamInfo(res);
    })
  }, [jamId]);

  
  let history = useHistory();
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = (data) => {
    data.registeredUser = true;
    if(data.password !== data.confirmPassword){
      setPasswordError(true);
      return;
    }
    const email = data.email;
    const password = data.password;

    AuthService.register(email, password)
    .then(res => {
      const userId = res.id;
      DataService.getJamInfoById(jamId)
      .then(res => {
        const jamInfo = res
        DataService.addJamToUser(userId, jamInfo);
      })
    });

    const userRole = jamInfo.adminId === userId ? 'Admin' : 'Guest';
    
    setJamId(jamId);
    setUserRole(userRole);
    setSection('overview');
    setSubSection('');
    history.push(`/`);
  };

  console.log('jamInfo: ', jamInfo);
  const {jamName, admin } = jamInfo;

  return (
    <form
      className="register-hook-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="register-form-section">
          <div className="register-form-section-title">
            <p>Hello {firstName} !<p>
            <p>{admin} has invite you to join to {jamName}</p>
            </p>Please register to Jammint and we'll take you there</p>
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

          <div className="form-line">
              <div className="custom-input-block">
                  <div className="block-label">
                      <label>Password</label>
                      {passwordError && <div className="field-error">Non valid password</div>}
                  </div>
                  <input name="password" />
              </div>
            </div>

            <div className="form-line">
              <div className="custom-input-block">
                  <div className="block-label">
                      <label>Confirm Password</label>
                      {passwordError && <div className="field-error">Non valid password</div>}
                  </div>
                  <input name="confirmPassword"/>
              </div>
          </div> 
      </div>
      <div className="hook-form-buttonArea">
          <input type="submit" />
      </div>
    </form>
  );
};


export default connect (null, {setJamId, setSection, setSubSection, setUserId, setUserRole})(RegisterWithInvitation);