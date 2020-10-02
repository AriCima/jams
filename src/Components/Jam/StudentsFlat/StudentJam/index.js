import React, { useState, useEffect }from 'react';
import { connect } from 'react-redux';

import { setRegisteredUser } from  '../../../../redux/actions/userActions';
import DataService from '../../../services/DataService';
import JamRegistrationForm from '../../../Forms/JamRegistrationForm';

import UserNavBar from '../../../NavBars/UserNavBar';
// import TenantOverview from '../../../JamSections/TenantOverview';
// import TenantBoard from '../../../JamSections/TenantBoard';
// import TenantRooms from '../../../JamSections/TenantRooms';
// import TenantTenants from '../../../JamSections/TenantTenants';
// import TenantSettings from '../../../JamSections/TenantSettings';

import './index.scss';

const TenantJam = ({ jamId, userId, setRegisteredUser }) => {
    
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

    // const renderSection = (section) => {
    //     switch (section) {
    //         case 'Overview':
    //             return <TenantOverview jamId={jamId} />;
    //         case 'Board':
    //             return <TenantBoard jamId={jamId} />;
    //         case 'Rooms':
    //             return <TenantRooms jamId={jamId} />;
    //         case 'Tenants':
    //             return <TenantTenants jamId={jamId} />;
    //         case 'Settings':
    //             return <TenantSettings jamId={jamId} />;
    //         case 'rent':
    //         default:
    //             return ;
    //     }
    // };

    return (
        <div className="jam-wrapper">
            
            <div className="jam-navBar">
                <UserNavBar/>
            </div>

            <div className="jam-body">
                {/* {renderSection(currentSection)} */}
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

    const { section } = state.nav;
    const {jamName, jamDesc, jamType } = state.jamInfo;
    const { jamId } = state.nav;
    const {userId, userName } = state.userInfo;

    return { jamId, section, userId, userName, jamName, jamDesc, jamType };
};

export default connect(mapStateToProps, { setRegisteredUser })(TenantJam);