import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import OccupancyGraph from './OccupancyGraph';
import DataService from '../../../services/DataService';
import Calculations from '../../../services/Calculations';

import './index.scss';

const AdminOverview = ({ jamId, jamDetails }) => {    
    
    const [jammers, setJammers ] = useState([]);

    useEffect(() => {
        DataService.getJammers(jamId)
        .then((res) => {
            console.log('jammers = ', res)
            const nrOfRooms = jamDetails.nrOfRooms;
            const currentOccupancy = Calculations.getCurrentOccupancy(res, nrOfRooms);

            setJammers(res)
        })

    }, [jamId])


    const rate = 10;
    return (
        <div className="overview-wrapper">

           <div className="overview-section">
               <div className="overview-section-title">
                   <h2>Notifications</h2>
               </div>
               <div className="overview-section-content">
                   <p>notifications</p>
                   <p>notifications</p>
                   <p>notifications</p>
                   <p>notifications</p>
               </div>
           </div>

           <div className="overview-section">
               <div className="overview-section-title">
                   <h2>Occupancy &amp; Incomes</h2>
               </div>
               <div className="overview-section-content">
                    <div className="ocupacion">
                        <OccupancyGraph rate={rate}/>
                    </div>
                    <div className="incomes">
                        <div className="incomse-label">
                            <p>Month Incomes [€]</p>
                        </div>
                        <div className="incomes-value">
                            <p>5.800</p>
                        </div>
                    </div>
               </div>
           </div>

        </div>
    );
};

const mapStateToProps = state => {
    const jamId = state.nav.jamId;
    const { userId } = state.userInfo;
    const { jamDetails } = state.jamInfo

    return { jamId, jamDetails, userId };
};
export default connect(mapStateToProps, null)(AdminOverview);
