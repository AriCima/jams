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



    return (
        <div className="landlord-tenants">
            
            <div className="landlord-tenant-list">
                {showJammersList ? 
                    <LandlordTenantsList
                        jammers={jammers} 
                    /> 
                    : 
                    <p>Loading</p>
                }
            </div>

            <div className="landlord-tenants-info">

                <LandlordTenantInfo 
                    subSection={subSection} 
                    jamId={jamId} 
                />

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