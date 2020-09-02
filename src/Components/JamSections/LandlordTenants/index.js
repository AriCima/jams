/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// import DataService from '../../services/DataService';
// import Calculations from '../../services/Calculations';
// import LandlordTenantsList from './LandlordTenantsList';
import LandlordTenantInfo from './LandlordTenantInfo';
import LandlordTenantsOverview from './LandlordTenantsOverview';

import './index.scss';

const LandlordTenants = ({ jamId, docType, docId }) => {

    const renderTenantsScreen = () => {
        switch (docType) {
            case 'TENANT-FORM':
                return <LandlordTenantInfo docId={docId} /> 
            case 'ADD-TENANT':
                return <LandlordTenantInfo docId={docId} />
            default: 
                return <LandlordTenantsOverview jamId={jamId}/>
        }
    }

    return (
        <div className="landlord-tenants">

            {renderTenantsScreen()}
            
        </div>

    );
};


const mapStateToProps = (state) => {
    const { docType , docId } = state.doc;
    return { docType, docId }
    
};
export default connect(mapStateToProps, null)(LandlordTenants);