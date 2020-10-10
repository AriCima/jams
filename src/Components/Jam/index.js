import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import DataService from '../services/DataService'

import JamNavBar from '../NavBars/JamNavBar';
import Overview from '../JamSections/Overview';
import Board from '../JamSections/Board';
import Rooms from '../JamSections/Rooms';
import Jammers from '../JamSections/Jammers';
import Settings from '../JamSections/Settings';
import { setRegisteredUser } from  '../../redux/actions/userActions';
import JamRegistrationForm from '../Forms/JamRegistrationForm';

import './index.scss';
import { setDocId } from '../../redux/actions/docsActions';
const Jam = ({ jamId, userId, section } ) => {

    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [invId, setInvId] = useState('')
    
    useEffect(() => {
        jamId && DataService.getJammerInfo(jamId, userId)
        .then(res => {
            const alreadyRegistered = res.registeredUser;
            setRegisteredUser(alreadyRegistered);
            if (!alreadyRegistered) {
                const invitationId = res.invId;
                setInvId(invitationId);
                setTimeout(() => showForm(true), 3000);
            } 
        })
    }, [userId])

  const renderSection = (section) => {
      switch (section) {
          case 'Overview':
              return <Overview />;
          case 'Board':
              return <Board/>;
          case 'Rooms':
              return <Rooms />;
          case 'Tenants':
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
}

  return (
    <>
        <div className="jam-navBar">
            <JamNavBar/>
        </div>

        <div className="jam-body">
            {renderSection(section)}
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
    const { userId } = state.userInfo;
    return { section, jamId, userId };
};

export default connect(mapStateToProps)(Jam);





