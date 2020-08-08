
import React, { Fragment } from 'react';
import LandlordTenantCard from './LandlordTenantCard';

import './index.scss';

const LandlordTenantsList = ({ jammers, jamInfo }) => {

    const renderJammersList = () => {
        return jammers.map((jammerInfo, i) => {
            return (
                <React.Fragment key={i}>
                    <LandlordTenantCard
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

export default LandlordTenantsList;