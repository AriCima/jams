import React from 'react';
import './index.scss';

const OccupancyGraph = ({ occupancy }) => {

    const activeWidth = occupancy + '%';

    return (
        <div className="occupancy-container">
            <div
                className="occupancy-active"
                style={{ width: activeWidth }}
            />
        </div>
    )
};

export default OccupancyGraph;
