import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import LandlordNavBar from '../../../NavBars/LandlordNavBar';
import LandlordBoard from '../../../JamSections/LandlordBoard';
import LandlordRooms from '../../../JamSections/LandlordRooms';
import LandlordSettings from '../../../JamSections/LandlordSettings';

import './index.scss';

const LandlordJam = ({ jamId, jamInfo, jamActiveSection }) => {

    const renderSection = (section) => {
        switch (section) {
            case 'Rooms':
                return <LandlordRooms jamId={jamId} />;
            case 'Settings':
                return <LandlordSettings jamId={jamId} />;
            case 'rent':
            default:
                return <LandlordBoard jamId={jamId} />;
        }
    };

    return (
        <div className="landlord-jam-wrapper">
            <div className="landlord-jam-header">
                <LandlordNavBar
                    jamName={jamInfo.jamName}
                    jamDesc={jamInfo.jamDesc}
                    jamActiveSection={jamInfo.jamActiveSection}
                    jamType={jamInfo.jamType}
                />
            </div>

            <div className="landlord-jam-container">
                {renderSection(jamActiveSection)}
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