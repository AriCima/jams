/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import DataService from '../../../services/DataService';
import Calculations from '../../../services/Calculations';
import LandlordTenantsList from './LandlordTenantsList';
import InviteTenantButton from '../../../UI/Buttons/InviteTenantButton';
import AddTenantButton from '../../../UI/Buttons/AddTenantButton';
import './index.scss';

const LandlordTenantsOverview = ({ jamId }) => {
    const [jammers, setJammers] = useState([]);
    
    useEffect(() => {
        getJammersList(jamId)
    }, []);

    const getJammersList = async (jamId) => {
        const res = await DataService.getJammers(jamId);
        if(res.length > 0) {
            const organizedTenants = Calculations.organizeTenants(res);
            setJammers(organizedTenants);
        };
    };

    return (

        <>
            <div className="landlord-tenants-buttonsArea">
                {/* <div className="landlord-tenants-button">
                    <AddTenantButton jamId={jamId}/>
                </div> */}
                <div className="landlord-tenants-button">
                    <InviteTenantButton jamId={jamId} />                
                </div>
            </div>

            <div className="landlord-tenants-section">
                <div className="subSection-title">
                    <p>Current Tenants</p>
                </div>
                <div className="subsection-wrapper">
                    <LandlordTenantsList tenantsList={jammers.currentTenants} />
                </div>
            </div>

            <div className="landlord-tenants-section">
                <div className="subSection-title">
                    <p>Future Tenants</p>
                </div>
                <div className="subsection-wrapper">
                    <LandlordTenantsList tenantsList={jammers.futureTenants} />
                </div>
            </div>

            <div className="landlord-tenants-section">
                <div className="subSection-title">
                    <p>Former Tenants</p>
                </div>
                <div className="subsection-wrapper">
                    <LandlordTenantsList tenantsList={jammers.formerTenants} />
                </div>
            </div>
                </>

    );
};


const mapStateToProps = (state) => {
    const { docType , docId } = state.doc;
    return { docType, docId }
    
};
export default connect(mapStateToProps, null)(LandlordTenantsOverview);