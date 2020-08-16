import React from 'react';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import OverviewLine from './OverviewLine';

import { setSection, setSubSection } from '../../../../redux/actions/navigateActions';

import './index.scss';

const RoomsOverview = ({ roomsFullInfo }) => {
    
    const showOverviewChart = !isEmpty(roomsFullInfo);
    


    const renderRoomsChart = () => roomsFullInfo.map((room, i) => {

        return (

            <OverviewLine key={i}  room={room} />
            // <div className="overview-info-line"
            //     key={i} 
            //     onCLick={e => handleClick(e, roomId)}
            // >
            //     <div className="overview-info-block">
            //         <p>{room.roomNr}</p>
            //     </div>
            //     <div className="overview-info-block">
            //         <p>{room.roomType}</p>
            //     </div>
            //     <div className="overview-info-block">
            //         {vacantRoom ?  <span>vacant</span>: <p>{bookInfo.jammerName}</p>}
            //     </div>
            //     <div className="overview-info-block">
            //         {vacantRoom ? <p>-</p> : <p>{bookInfo.deposit}</p>}
            //     </div>
            //     <div className="overview-info-block">
            //         {vacantRoom ? <p>-</p> : <p>{bookInfo.rent}</p>}
            //     </div>
            // </div>
        )
    });

    return (
        <div className="overview-wrapper">
            <div className="overview-info-chart">
                <div className="overview-info-chart-header">
                    <div className="overview-info-chart-header-block">
                        <p>Room Nr</p>
                    </div>
                    <div className="overview-info-chart-header-block">
                        <p>Type</p>
                    </div>
                    <div className="overview-info-chart-header-block">
                        <p>Current Tenant</p>
                    </div>
                    <div className="overview-info-chart-header-block">
                        <p>Deposit €</p>
                    </div>
                    <div className="overview-info-chart-header-block">
                        <p>Rent €</p>
                    </div>
                </div>
                {showOverviewChart ? renderRoomsChart() : <p>Loading</p>}
            </div>
        </div>
    );
};

export default RoomsOverview;
