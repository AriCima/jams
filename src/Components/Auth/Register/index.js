import React from 'react';
import {useForm} from "react-hook-form";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';

import DataService from '../../services/DataService';
import AuthService from '../../services/AuthService';

import './index.scss';
import { setJamId } from '../../../redux/actions/navigateActions';


const useRegisterForm = ({jamId}) => {

  let history = useHistory();
  const { register, errors, getValues, handleSubmit } = useForm();

  const onRegister = (data) => {  
    const {firstName, lastName, email, password }= data;  
    DataService.checkIfEmialExists(email)
    .then(exists => {
      console.log('exists: ', exists);
      if (exists === true) {
        alert('el email ya existe')
        return;
      } else {
        AuthService.register(firstName, lastName, email, password)
        .then(res => {
          console.log(res);
          history.push('/')
        })
      }
    })
  };

  return (

    <form
        className="register-hook-form"
        onSubmit={handleSubmit(onRegister)}
    >
      <div className="register-form-section">
          <div className="form-section-title">
              <p>Register and start jamin'</p>
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
      </div>
      <div className="hook-form-buttonArea">
          <input type="submit" />
      </div>
    </form>
  );
};

const mapStateToProps = (state) => {
  const jamId = state.nav.jamId;
  return { jamId }
};

export default connect(mapStateToProps, null)(useRegisterForm);

// import React, { Component } from 'react';

// import { Redirect } from 'react-router-dom'
// import { connect } from 'react-redux';
// import { registerAction } from '../../../redux/actions/authActions'

// import './index.css';

// class Register extends Component {
//   constructor(props){
//     super(props);

//     this.state = {
//       email           : '',
//       password        : '',
//       passwordConfirm :'',
//       userId          : '',
//       passwordError   : false,
//       emailError      : false,
//     }

//   }

//   handleChange=(e)=>{
//     this.setState({
//         [e.target.id]: e.target.value
//     })
//   }

//   register(e){
//     e.preventDefault();
//     let error = false;

//     if(this.state.email === ''){
//       this.setState({emailError: true});
//       error = true;
//     }
//     if(this.state.password === ''){
//       this.setState({passwordError: true});
//       error = true;
//     }

//     if(this.state.password !== this.state.passwordConfirm){
//       this.setState({passwordError: true});
//       error = true;
//     }


//     this.props.signUp(this.state)

//   }

//   render(){
//     const {emailError, passwordError} = this.state;

//     return (

//       <div className="background-register">
      
//         <div className="inner-container">
        
//           <form onSubmit={this.register}> 

//             <div className="box">
        
//             <input 
//                 type="firstName" 
//                 placeholder="firstName"
//                 value={this.state.email} 
//                 onChange={this.handleChange}
//               />
//               {emailError && alert("Email is mandatory")}

//               <input 
//                 type="email" 
//                 placeholder="Email"
//                 value={this.state.email} 
//                 onChange={this.handleChange}
//               />
//               {emailError && alert("Email is mandatory")}

//               <input 
//                 type="password" 
//                 placeholder="Password"
//                 value={this.state.password} 
//                 onChange={this.handleChange}
//               />

//               <input 
//                 type="password" 
//                 placeholder="Confirm Password"
//                 value={this.state.passwordConfirm} 
//                 onChange={this.handleChange}
//               />
//               {passwordError && alert("Passwords don't match!")}

//               <div className="form-item">
//                 <button type="submit">Register</button>
//               </div>
//             </div>

//           </form>
//         </div>
//       </div>

//     );
//   }

// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//       signUp: (newUser) => dispatch(registerAction(newUser)) 
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//       auth: state.firebase.auth,
//       authError: state.auth.authError
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Register)