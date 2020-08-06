import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import LandlordNavBar from '../../../NavBars/LandlordNavBar';
import LandlordBoard from '../../../JamSections/LandlordBoard';
import LandlordRooms from '../../../JamSections/LandlordRooms';
import LandlordSettings from '../../../JamSections/LandlordSettings';

import './index.css';

const LandlordJam = ({ jamId, jamInfo, jamActiveSection }) => {

    return (
        <div className="landlord-jam-wrapper">
            <div className="landlord-jam-header">
                {jamInfo === [] ? <></> : (
                    <LandlordNavBar
                        jamName={jamInfo.jamName}
                        jamDesc={jamInfo.jamDesc}
                        jamActiveSection={jamInfo.jamActiveSection}
                        jamType={jamInfo.jamType}
                    />
                )}
            </div>

            <div className="landlord-jam-container">
                { jamActiveSection === 'Board' && <LandlordBoard jamId={jamId} /> }
                { jamActiveSection === 'Rooms' && <LandlordRooms jamId={jamId} /> }
                { jamActiveSection === 'Settings' && <LandlordSettings jamId={jamId} /> }
            </div>
        </div>
    );
};


const mapStateToProps = state => {
    return {
        jamInfo: state.jamInfo,
        auth: state.firebase.auth,
        jamActiveSection: state.jamSection,
        jammerId: state.jammerId,
    };
};

export default connect(mapStateToProps)(LandlordJam);