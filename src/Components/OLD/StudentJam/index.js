import React, { useState, useEffect }from 'react';
import { connect } from 'react-redux';

import { setRegisteredUser } from  '../../../../redux/actions/userActions';
import DataService from '../../../services/DataService';
import JamRegistrationForm from '../../../Forms/JamRegistrationForm';

import UserNavBar from '../../../NavBars/UserNavBar';
import UserOverview from '../../../JamSections/UserOverview';
import UserBoard from '../../../JamSections/UserBoard';
import UserJammers from '../../../JamSections/UserJammers';

import './index.scss';

const TenantJam = ({ jamId, section, userId }) => {
    
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    
    useEffect(() => {
        jamId && DataService.getJammerInfo(jamId, userId)
        .then(res => {
            const alreadyRegistered = res.registeredUser;
            console.log('alreadyRegistered: ', alreadyRegistered);
            setRegisteredUser(alreadyRegistered);
            if (!alreadyRegistered) {
                setTimeout(() => showForm(true), 3000);
            } 
        })
    }, [userId])

    const showForm = (x) => {
        setShowRegisterForm(x);
    }

    const renderSection = (section) => {
        switch (section) {
            case 'Overview':
                return <UserOverview jamId={jamId} />;
            case 'Board':
                return <UserBoard jamId={jamId} />;
            case 'Tenants':
                return <UserJammers jamId={jamId} />;
            default:
                return ;
        }
    };

    return (
        <div className="jam-wrapper">
            
            <div className="jam-navBar">
                <UserNavBar/>
            </div>

            <div className="jam-body">
                {renderSection(section)}
            </div>

            { showRegisterForm && (
                <div className="jamRegistration-Form-wrapper">
                    <JamRegistrationForm
                        showForm={showForm}
                        userId={userId}
                    />
                    <div className="form-bg"></div>
                </div>
            )}

        </div>
    );
};


const mapStateToProps = state => {

    const { jamId, section } = state.nav;
    const { userId, userName } = state.userInfo;

    return { jamId, section, userId, userName, };
};

export default connect(mapStateToProps, { setRegisteredUser })(TenantJam);