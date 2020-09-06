import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import {useForm} from "react-hook-form";
import AuthService from '../../services/AuthService'
import DataService from '../../services/DataService';

const useRegisterWithJamId = ({jamId, invId }) => {
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
    history.push(`/jam/${jamId}/${invId}`);

  };

  return (
    <form
      className="register-hook-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="register-form-section">
          <div className="register-form-section-title">
            <p>Please register to jam to {jamId}</p>
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

export default useRegisterWithJamId;