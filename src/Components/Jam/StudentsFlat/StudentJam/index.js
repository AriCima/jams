import React, { useState, useEffect }from 'react';
import { connect } from 'react-redux';

import { setRegisteredUser } from  '../../../../redux/actions/userActions';

import DataService from '../../../services/DataService';

import JamRegistrationForm from '../../../Forms/JamRegistrationForm';

// COMPONENTS
// import TenantNavBar from '../../../NavBars/LandlordNavBar';
// import TenantOverview from '../../../JamSections/TenantOverview';
// import TenantBoard from '../../../JamSections/TenantBoard';
// import TenantRooms from '../../../JamSections/TenantRooms';
// import TenantTenants from '../../../JamSections/TenantTenants';
// import TenantSettings from '../../../JamSections/TenantSettings';

import './index.scss';

const TenantJam = ({ jamId, jamName, jamDesc, jamType, userName, userId, section, setRegisteredUser }) => {
    
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    
    useEffect(() => {
        DataService.getJammerInfo(jamId, userId)
        .then(res => {
            const alreadyRegistered = res.registeredUser;
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
        // switch (section) {
        //     case 'Overview':
        //         return <TenantOverview jamId={jamId} />;
        //     case 'Board':
        //         return <TenantBoard jamId={jamId} />;
        //     case 'Rooms':
        //         return <TenantRooms jamId={jamId} />;
        //     case 'Tenants':
        //         return <TenantTenants jamId={jamId} />;
        //     case 'Settings':
        //         return <TenantSettings jamId={jamId} />;
        //     case 'rent':
        //     default:
        //         return ;
        // }
    };

    return (
        <div className="jam-wrapper">
            { showRegisterForm && (
                <div className="jamRegistration-Form-wrapper">
                    <JamRegistrationForm
                        showForm={showForm}
                    />
                </div>
            )}
            <div className="jam-navBar">
                {/* <TenantNavBar
                    jamName={jamName}
                    jamDesc={jamDesc}
                    jamSection={section}
                    jamType={jamType}
                /> */}

                THiS IS TENANTS JAM
            </div>

            <div className="jam-body">
                {/* {renderSection(currentSection)} */}
            </div>

        </div>
    );
};


const mapStateToProps = state => {

    const { section } = state.nav;
    const {jamName, jamDesc, jamType } = state.jamInfo;
    const {userId, userName }= state.userInfo;

    return { section, userId, userName, jamName, jamDesc, jamType };
};

export default connect(mapStateToProps, { setRegisteredUser })(TenantJam);