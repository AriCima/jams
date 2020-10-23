import React, { useEffect, useState } from 'react'
import firebase from 'firebase';
import { connect } from 'react-redux';

// FONTAWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons'

// COMPONENTS
import JoinPopup from './JoinPopup';
import CreatePopup from './CreatePopup';

import { setUserId, setUserEmail,setUserFirstName, setUserLastName } from '../../../redux/actions/userActions';
import { setJamId } from '../../../redux/actions/navigateActions';

// CSS
import './index.scss';

const AppNavBar = ({ userId, setUserId, setUserEmail, setJamId, setUserFirstName, setUserLastName }) => {
    
    

    const signOut = (e) => {
        e.preventDefault();
        firebase.auth().signOut()
        .then(() => {
            alert('See you later');
            resetUser()
        })
        .catch(() => {
            this.props.alert.error("Ups! Seems you'll have to stay longer")// An error happened.
        });
    };
    
    const resetUser = () => {
        localStorage.setItem('userId', '');
        localStorage.setItem('email', '');
        localStorage.setItem('firstName', '');
        localStorage.setItem('lastName', '');
        setUserId('');
        setUserEmail('');
        setJamId('');
        setUserFirstName('');
        setUserLastName('');
    };
    
    console.log('userId: ', userId);
    return (
        <div className="navBar-icons">

            <div className="navBar-item">
                <CreatePopup
                    user={ userId }
                />
            </div>

            <div className="navBar-item">
                <JoinPopup
                    user={ userId }
                />
            </div>

            { userId && (
                <div className="navBar-item" onClick={e => signOut(e)}>
                    <FontAwesomeIcon
                        className="signOut-icon-style"
                        icon={faSignOutAlt}
                    />
                </div>
            )}
        </div>
    );   
};


const mapStateToProps = state => {
    const { userId } = state.userInfo;
    return { userId }
}
export default connect(mapStateToProps, {setUserEmail, setUserId, setJamId, setUserFirstName, setUserLastName})(AppNavBar);
