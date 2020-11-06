import React from 'react';
import './index.scss';

const OccupancyGraph = ({ rate }) => {

    const activeWidth = rate + '%';
    const inactiveWidth = (100 - rate) + '%';

    return (
        <div className="occupancy-container">
            <input
                className="occupancy-slider"
                type="range"
                value={rate}
                min="0"
                max="100"
            />
            <div
            className="occupancy_active"
            style={{ width: activeWidth }}
            />
            <div
            className="occupancy_inactive"
            style={{ width: inactiveWidth }}
           
            />
        </div>
    )
};

export default OccupancyGraph;
