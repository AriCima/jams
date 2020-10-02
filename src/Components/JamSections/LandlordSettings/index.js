
import React, { useState, useEffect } from 'react';

// COMPONENTS
import { connect } from 'react-redux';

// CSS
import './index.css';

const LandlordSettings = (props) => {

 

    return (

        <div className="landlord-jam-settings">
            <div className="landlord-jam-settings-section">
                <div className="landlord-jam-settings-section-title">
                    <h2>Jam Info</h2>
                </div>
            </div>
            <div className="landlord-jam-settings-section">
                <div className="landlord-jam-settings-section-title">
                    <h2>Apartment Info</h2>
                    <p>
                        We
                        <span> strongly </span>
                        recomend you to fill the information about the apartment location in order to be able to automaticallyprint a contract upon a reception of a booking
                    </p>
                </div>
            </div>
            <div className="landlord-jam-settings-section">
                <div className="landlord-jam-settings-section-title">
                    <h2>Landlord Info</h2>
                </div>
            </div>
        </div>
    );
};



const mapStateToProps = (state) => {
    return {
        user: state.userInfo.usereId,
        jamId: state.nav.jamId,
    };
};
export default connect(mapStateToProps, null)(LandlordSettings);
