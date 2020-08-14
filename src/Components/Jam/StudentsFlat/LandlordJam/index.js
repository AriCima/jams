import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import LandlordNavBar from '../../../NavBars/LandlordNavBar';
import LandlordBoard from '../../../JamSections/LandlordBoard';
import LandlordRooms from '../../../JamSections/LandlordRooms';
import LandlordTenants from '../../../JamSections/LandlordTenants';
import LandlordSettings from '../../../JamSections/LandlordSettings';

import './index.scss';

const LandlordJam = ({ jamId, jamInfo, section }) => {
    const { jamName, jamDesc, jamType } = jamInfo;

    const renderSection = (section) => {
        switch (section) {
            case 'Board':
                return <LandlordBoard jamId={jamId} />;
            case 'Rooms':
                return <LandlordRooms jamId={jamId} />;
            case 'Tenants':
                return <LandlordTenants jamId={jamId} />;
            case 'Settings':
                return <LandlordSettings jamId={jamId} />;
            case 'rent':
            default:
                return ;
        }
    };

    return (
        <div className="landlord-jam-wrapper">
            <div className="landlord-jam-header">
                <LandlordNavBar
                    jamName={jamName}
                    jamDesc={jamDesc}
                    jamSection={section}
                    jamType={jamType}
                />
            </div>

            <div className="landlord-jam-container">
                {renderSection(section)}
            </div>
        </div>
    );
};


const mapStateToProps = state => {
    const { section } = state.nav;
    return {
        section
    };
};

export default connect(mapStateToProps)(LandlordJam);