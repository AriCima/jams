import React, { Component } from 'react';

import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { registerAction } from '../../../redux/actions/authActions'

import './index.css';


class Register extends Component {
  constructor(props){
    super(props);

    this.state = {
      email           : '',
      password        : '',
      passwordConfirm :'',
      userId          : '',
      passwordError   : false,
      emailError      : false,
    }

  }

  handleChange=(e)=>{
    this.setState({
        [e.target.id]: e.target.value
    })
  }

  register(e){
    e.preventDefault();
    let error = false;

    if(this.state.email === ''){
      this.setState({emailError: true});
      error = true;
    }
    if(this.state.password === ''){
      this.setState({passwordError: true});
      error = true;
    }

    if(this.state.password !== this.state.passwordConfirm){
      this.setState({passwordError: true});
      error = true;
    }


    this.props.signUp(this.state)

  }

  render(){
    const {emailError, passwordError} = this.state;

    return (

      <div className="background-register">
      
        <div className="inner-container">
        
          <form onSubmit={this.register}> 

            <div className="box">
        
              <input 
                type="email" 
                placeholder="Email"
                value={this.state.email} 
                onChange={this.handleChange}
              />
              {emailError && alert("Email is mandatory")}

              <input 
                type="password" 
                placeholder="Password"
                value={this.state.password} 
                onChange={this.handleChange}
              />

              <input 
                type="password" 
                placeholder="Confirm Password"
                value={this.state.passwordConfirm} 
                onChange={this.handleChange}
              />
              {passwordError && alert("Passwords don't match!")}

              <div className="form-item">
                <button type="submit">Register</button>
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
      signUp: (newUser) => dispatch(registerAction(newUser)) 
  }
}

const mapStateToProps = (state) => {
  return {
      auth: state.firebase.auth,
      authError: state.auth.authError
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register)