import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import DataService from '../services/DataService'

import JamNavBar from '../NavBars/JamNavBar';
import Overview from '../JamSections/Overview';
import Chat from '../JamSections/Chat';
import Board from '../JamSections/Board';
import Rooms from '../JamSections/Rooms';
import Jammers from '../JamSections/Jammers';
import Settings from '../JamSections/Settings';
import { setRegisteredUser } from  '../../redux/actions/userActions';
import JamRegistrationForm from '../Forms/JamRegistrationForm';

import './index.scss';

const Jam = ({ jamId, jamType, userId, section, adminName, userRole } ) => {

    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [invId, setInvId] = useState('')
    
    useEffect(() => {
        if(userRole && jamType !== 'chat') {
            const isAdmin = userRole === 'Admin';
            setShowRegisterForm(false);
            if(!isAdmin) {
                console.log('adminName :',  adminName);
                console.log('entró en no es Admin');
                getJammerInfo();
            };
        };
    }, [userRole]);


    const getJammerInfo = async () => {
        DataService.getJammerInfo(jamId, userId)
        .then(res => {
            const alreadyRegistered = res.registeredUser;
            setRegisteredUser(alreadyRegistered);
            if (!alreadyRegistered) {
                const invitationId = res.invId;
                setInvId(invitationId);
                setTimeout(() => showForm(true), 3000);
            }
        })
    }

    const renderSection = (section) => {
        switch (section) {
            case 'Overview':
                return <Overview />;
            case 'Board':
                return <Board section={'board'}/>;
            case 'Rooms':
                return <Rooms />;
            case 'Tenants':
                return <Jammers />;
            case 'Flatmates':
                return <Jammers />;
            case 'Settings':
                return <Settings />;
            case 'rent':
            default:
                return ;
        }
    };

    const showForm = (x) => {
        setShowRegisterForm(x);
    };

  return (
    <>
        
        <div className="jam-navBar">
            <JamNavBar/>
        </div>

        <div className="jam-body">
            { jamType === 'chat' ? (
                <Chat />
            ): (
                renderSection(section))
            }
        </div>

        { showRegisterForm && (
            <div className="jamRegistration-Form-wrapper">
                <JamRegistrationForm
                    showForm={showForm}
                    userId={userId}
                    invId={invId}
                />
                <div className="form-bg"></div>
            </div>
        )}
    </>
  );

};



const mapStateToProps = state => {
    const { jamId, section } = state.nav;
    const { userId, userRole } = state.userInfo;
    const {jamType, adminName } = state.jamInfo;

    return { section, jamId, jamType, userId, adminName, userRole };
};

export default connect(mapStateToProps)(Jam);





