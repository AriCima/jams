
import React, { Fragment } from 'react';

// COMPONENTS
import LandlordJammerCard from './LandlordJammerCard';


// CSS
import './index.css';

const LandlordJammersList = (props) => {

    const { jammers, jamInfo } = props;

    const renderJammersList = () => {
        return jammers.map((jammerInfo, i) => {
            return (
                <React.Fragment key={i}>
                    <LandlordJammerCard
                        jamInfo={jamInfo} 
                        jI={jammerInfo} 
                    />
                </React.Fragment>
            )
        })
    }

    return (

        <Fragment>
            { jammers ? renderJammersList() : <p>Loading</p>}
        </Fragment>

    );   
};

export default LandlordJammersList;