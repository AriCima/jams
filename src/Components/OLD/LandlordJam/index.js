import React, { useState, useEffect }from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import LandlordNavBar from '../../../NavBars/LandlordNavBar';
import LandlordOverview from '../../../JamSections/LandlordOverview';
import LandlordBoard from '../../../JamSections/LandlordBoard';
import LandlordRooms from '../../../JamSections/LandlordRooms';
import LandlordTenants from '../../../JamSections/LandlordTenants';
import LandlordSettings from '../../../JamSections/LandlordSettings';

import './index.scss';

const LandlordJam = ({ jamId, jamInfo, section }) => {
    const { jamName, jamDesc, jamType } = jamInfo;

    const [currentSection, setCurrentSection] = useState('');

    useEffect(() => {
        setCurrentSection(section)
    }, [section])

    const renderSection = (section) => {
        switch (section) {
            case 'Overview':
                return <LandlordOverview jamId={jamId} />;
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
        <div className="jam-wrapper">
            <div className="jam-navBar">
                <LandlordNavBar
                    jamName={jamName}
                    jamDesc={jamDesc}
                    jamSection={section}
                    jamType={jamType}
                />
            </div>

            <div className="jam-body">
                {renderSection(currentSection)}
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