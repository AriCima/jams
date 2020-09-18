/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import LandlordTenantInfo from './LandlordTenantInfo';
import LandlordTenantsOverview from './LandlordTenantsOverview';
import InviteTenantForm from '../../Forms/InviteTenantForm';
// import AddTenantForm from '../../Forms/InviteTenantForm';

import './index.scss';

const LandlordTenants = ({ jamId, docType, docId }) => {

    const renderTenantsScreen = () => {
        switch (docType) {
            case 'TENANT-FORM': // for existing tenants --> edit info
                return <LandlordTenantInfo docId={docId} /> 
            // case 'ADD-TENANT':  // to add a new tenant --> set info
            //     return <AddTenantForm jamId={jamId} />
            case 'INVITE-TENANT':  // to invite a new tenants --> set info
                return <InviteTenantForm jamId={jamId} />
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