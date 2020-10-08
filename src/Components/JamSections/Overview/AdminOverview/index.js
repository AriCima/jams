import React from 'react';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import OverviewLine from './OverviewLine';

import { setSection, setSubSection } from '../../../../redux/actions/navigateActions';

import './index.scss';

const AdminOverview = ({ roomsFullInfo }) => {    
    console.log('roomsFullInfo: ', roomsFullInfo);

    const renderRoomsChart = () => roomsFullInfo.map((room, i) => {
        return (
            <OverviewLine key={i}  room={room} />
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
                { renderRoomsChart() }
            </div>
        </div>
    );
};

export default AdminOverview;
