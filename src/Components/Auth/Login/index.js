import React from 'react';
import {useForm} from "react-hook-form";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';

import AuthService from '../../services/AuthService';
import { setUserId } from '../../../redux/actions/userActions'

import './index.scss';



const useLoginForm = ({jamId}) => {
    const { register, errors, handleSubmit } = useForm();
    
    let history = useHistory();

    const onLogin = (data) => {
        const { email, password }= data;  

        AuthService.login(email, password)
        .then(res => {
            const userId = res.user.uid;
            setUserId(userId);
            history.push('/');
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

const mapStateToProps = (state) => {
  const jamId = state.nav.jamId;
  return { jamId }
};

export default connect(mapStateToProps, { setUserId })(useLoginForm);



// import React, { Component } from '../../../../node_modules/react';
// import AuthService from '../../services/AuthService';
// import DataService from '../../services/DataService';

// import {Link} from 'react-router-dom';

// import { connect } from 'react-redux';
// import { setUserId } from '../../../redux/actions/userActions'
// import { Redirect } from 'react-router-dom'

// import './index.css';

// class Login extends Component {

//     constructor(props){
//         super(props);

//         this.state = {
//             userId      : '',
//             email       : '',
//             password    : '',
//             emailError  : false,
//             loginError  : '',
//             jamId       : '',
//         }
//     }

//     handleChange=(e)=>{
//         this.setState({
//             [e.target.id]: e.target.value
//         })
//     }


//     submitLogin = (e) => {
//         e.preventDefault();
//         AuthService.login(this.state.email, this.state.password)
//         .then(res => {
//             const userId = res.user.uid;
//             this.props.setUserId(userId)
//         })
//     }

//     render(){
//         const { authError, auth } = this.props
//         if (auth.uid) return <Redirect to="/" />
        
//         return (
//         <div className="background-login">

//           <div className="inner-container">

//               <form onSubmit={this.submitLogin}> 
              
//                 <div className="box">
                      
//                       <input 
//                           type="email" 
//                           placeholder="Email"
//                           id="email"
//                           value={this.state.email} 
//                           onChange={this.handleChange}
//                       />
//                       {this.state.emailError && <span className="form-error">Campo obligatorio</span>}
                  
//                       <input 
//                           type="password" 
//                           id="password"
//                           placeholder="Password"
//                           value={this.state.password} 
//                           onChange={this.handleChange}
//                       />
                  

//                   <div>
//                       {authError && <span>{authError}</span>}
//                   </div>

//                     <div className="sendArea">
//                         <button>Sign-In</button>
//                         <p>Not a member?</p>
//                         <div className="sendArea-register">
//                            <Link to="/register"><p>Register</p></Link>
//                         </div>
//                     </div>
//                 </div>
//               </form>
//             </div>
//         </div>
//       );
//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         authError: state.auth.authError,
//         auth: state.firebase.auth
//     }
// }

// export default connect(mapStateToProps, { setUserId })(Login)
