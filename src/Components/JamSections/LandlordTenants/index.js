/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import DataService from '../../services/DataService';
import LandlordTenantsList from './LandlordTenantsList';
import LandlordTenantInfo from './LandlordTenantInfo';
import { setSubSection } from '../../../redux/actions/navigateActions';


import './index.scss';

const LandlordTenants = ({ jamId, subSection, setSubSection }) => {
    const [jammers, setJammers] = useState([]);
    const [showJammersList, setShowJammersList] = useState(false);
    const [jammerInfo, setJammerInfo] = useState({});
    
    useEffect(() => {
        getJammersList(jamId)
    }, []);

    const getJammersList = async (jamId) => {
        const res = await DataService.getJammers(jamId);
        res.length > 0 && setShowJammersList(true);
        setJammers(res);
        const defaultTenant = res[0].id;
        setSubSection(defaultTenant)
    };

    useEffect(() => {
        if (subSection !== '') {
            getJammerInfo(jamId, subSection);
        }
    }, [subSection]);

    const getJammerInfo = async (jamId) => {
        const res = await DataService.getJammerInfo(jamId, subSection);
        setJammerInfo(res);
    };

    const currentTenants = [];
    const comingTenants = [];
    const formerTenants = [];


    return (
        <div className="landlord-tenants">

            <div className="landlord-tenants-section">
                <div className="subSection-title">
                    <p>Current Tenants</p>
                </div>
                <div className="subsection-wrapper">
                    <LandlordTenantsList tenantsList={currentTenants} />
                </div>
            </div>

            <div className="landlord-tenants-section">
                <div className="subSection-title">
                    <p>Coming Tenants</p>
                </div>
                <div className="subsection-wrapper">
                    <LandlordTenantsList tenantsList={comingTenants} />
                </div>
            </div>

            <div className="landlord-tenants-section">
                <div className="subSection-title">
                    <p>Former Tenants</p>
                </div>
                <div className="subsection-wrapper">
                    <LandlordTenantsList tenantsList={formerTenants} />
                </div>
            </div>
            
        </div>

    );
};


// const mapStateToProps = (state) => {
//     return {
//         user: state.firebase.auth,
//         jamId: state.jamId,
//         jamActiveSection: state.jamSection,
//         jammerId: state.jammerId
//     }
// }

const mapStateToProps = (state) => {
    const { subSection } = state.nav;
    return { subSection }
    
};
export default connect(mapStateToProps, { setSubSection })(LandlordTenants);