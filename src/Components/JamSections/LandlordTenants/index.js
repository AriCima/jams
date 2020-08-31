/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import DataService from '../../services/DataService';
import Calculations from '../../services/Calculations';
import LandlordTenantsList from './LandlordTenantsList';
import { setSubSection } from '../../../redux/actions/navigateActions';


import './index.scss';

const LandlordTenants = ({ jamId, docType }) => {
    const [jammers, setJammers] = useState([]);
    
    useEffect(() => {
        getJammersList(jamId)
    }, []);

    const getJammersList = async (jamId) => {
        const res = await DataService.getJammers(jamId);
        if(res.length > 0) {
            // setShowJammersList(true);
            const organizedTenants = Calculations.organizeTenants(res);
            console.log('organizedTenants: ', organizedTenants);
            setJammers(organizedTenants);
        };
    };

    const showTenantInfo = docType === 'TENANT-FORM';

    return (
        <div className="landlord-tenants">

            { showTenantInfo ? <p>TENANT FORM</p> : (

                <>
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

            )}
            
        </div>

    );
};


const mapStateToProps = (state) => {
    const { docType } = state.doc;
    return { docType }
    
};
export default connect(mapStateToProps, null)(LandlordTenants);