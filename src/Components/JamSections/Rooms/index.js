/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';

// COMPONENTS
import { connect } from 'react-redux';
import DataService from '../../services/DataService';
import Calculations from '../../services/Calculations';
import isEmpty from 'lodash/isEmpty';

import LandlordRoomInfo from './LandlordRoomInfo';
import RoomsOverview from './RoomsOverview';

// CSS
import './index.scss';

const Rooms = ({ subSection }) => {


    const showOverview = subSection === '';

    return (
        <div className="landlord-rooms">
            {/* <div className="landlord-room-info"> */}

                {showOverview ? <RoomsOverview/> : <LandlordRoomInfo/>}

            {/* </div> */}
        </div>
    );
};


const mapStateToProps = (state) => {
    const { subSection } = state.nav;
    return { subSection }
};

export default connect(mapStateToProps, null)(Rooms);
