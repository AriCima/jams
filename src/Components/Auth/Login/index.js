import React, { Component } from '../../../../node_modules/react';
import AuthService from '../../services/AuthService';
import DataService from '../../services/DataService';

import {Link} from 'react-router-dom';

import { connect } from 'react-redux';
import { loginAction } from '../../../redux/actions/authActions'
import { Redirect } from 'react-router-dom'

import './index.css';

class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            userId      : '',
            email       : '',
            password    : '',
            emailError  : false,
            loginError  : '',
            jamId       : '',
        }
    }

    handleChange=(e)=>{
        console.log('login state: ', e.target.id)
        this.setState({
            [e.target.id]: e.target.value
        })
    }


    submitLogin = (e) => {
        e.preventDefault();
        AuthService.login(this.state.email, this.state.password)
    }

    render(){
        const { authError, auth } = this.props
        if (auth.uid) return <Redirect to="/" />
        
        return (
        <div className="background-login">

          <div className="inner-container">

              <form onSubmit={this.submitLogin}> 
              
                <div className="box">
                      
                      <input 
                          type="email" 
                          placeholder="Email"
                          id="email"
                          value={this.state.email} 
                          onChange={this.handleChange}
                      />
                      {this.state.emailError && <span className="form-error">Campo obligatorio</span>}
                  
                      <input 
                          type="password" 
                          id="password"
                          placeholder="Password"
                          value={this.state.password} 
                          onChange={this.handleChange}
                      />
                  

                  <div>
                      {authError && <span>{authError}</span>}
                  </div>

                    <div className="sendArea">
                        <button>Sign-In</button>
                        <p>Not a member?</p>
                        <div className="sendArea-register">
                           <Link to="/register"><p>Register</p></Link>
                        </div>
                    </div>
                </div>
              </form>
            </div>
        </div>
      );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginAction: (creds) => dispatch(loginAction((creds)))
    }
};

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
