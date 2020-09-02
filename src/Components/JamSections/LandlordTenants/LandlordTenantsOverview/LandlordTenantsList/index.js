
import React, { Fragment } from 'react';
import LandlordTenantCard from './LandlordTenantCard';

import './index.scss';

const LandlordTenantsList = ({ tenantsList }) => {

    const renderJammersList = () => {
        return tenantsList.map((tL, i) => {
            return (
                <React.Fragment key={i}>
                    <LandlordTenantCard
                        tL={tL} 
                    />
                </React.Fragment>
            )
        })
    }

    return (
        <Fragment>
            { tenantsList ? renderJammersList() : <p>Loading</p>}
        </Fragment>
    );
};

export default LandlordTenantsList;