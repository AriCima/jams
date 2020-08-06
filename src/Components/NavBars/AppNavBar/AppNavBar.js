// COOL STYLE https://codepen.io/egoens/pen/NxejgJ

import React from 'react'
import { NavLink } from 'react-router-dom';

// FONTAWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons'

// COMPONENTS
import JoinPopup from './JoinPopup';
import CreatePopup from './CreatePopup';
import Home from './Home';
import { signOut } from '../../../redux/actions/authActions';

import { connect } from 'react-redux';

// CSS
import './index.css';

const AppNavBar = ({user, signOut, jamId}) => {

    return (

        <div className="navBar-icons">

            <div className="navBar-item">
                <FontAwesomeIcon className="navBar-menu-style" icon={faBars} />
            </div>

            <div className="navBar-item">
                <CreatePopup
                    user = { user }
                />
            </div>

            <div className="navBar-item">
                <JoinPopup
                    user = { user }
                />
            </div>

            <div className="navBar-item">
                <Home
                    user = { user }
                />
            </div>

            {/* { !user ? 
                <div className="navBar-item">
                    <NavLink to={`/login`}>Sign In</NavLink> 
                </div> :
                
                <div className="navBar-item" onClick={signOut}>
                    <FontAwesomeIcon className="signOut-icon-style" icon={faSignOutAlt} />
                </div>
            } */}


        </div>

    );   
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

const mapStateToProps = (state) => {
    // //console.log('state en el navBar = ', state)
    return {
        user: state.firebase.auth,
        jamId: state.jamId
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AppNavBar);
