import React, { useState, useEffect }from 'react';
import { connect } from 'react-redux';

// COMPONENTS
// import TenantNavBar from '../../../NavBars/LandlordNavBar';
// import TenantOverview from '../../../JamSections/TenantOverview';
// import TenantBoard from '../../../JamSections/TenantBoard';
// import TenantRooms from '../../../JamSections/TenantRooms';
// import TenantTenants from '../../../JamSections/TenantTenants';
// import TenantSettings from '../../../JamSections/TenantSettings';

// import './index.scss';

const TenantJam = ({ jamId, jamInfo, section }) => {
    // const { jamName, jamDesc, jamType } = jamInfo;

    // const [currentSection, setCurrentSection] = useState('');

    // useEffect(() => {
    //     setCurrentSection(section)
    // }, [section])

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
        <div className="landlord-jam-wrapper">
            <div className="landlord-jam-header">
                {/* <TenantNavBar
                    jamName={jamName}
                    jamDesc={jamDesc}
                    jamSection={section}
                    jamType={jamType}
                /> */}
            </div>

            <div className="landlord-jam-container">
                {/* {renderSection(currentSection)} */}
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

export default connect(mapStateToProps)(TenantJam);