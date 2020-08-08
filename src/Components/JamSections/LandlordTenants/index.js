/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import DataService from '../../services/DataService';
import LandlordTenantsList from './LandlordTenantsList';
import LandlordTenantInfo from './LandlordTenantInfo';
import { getJammerInfo } from '../../../redux/actions/jammersActions';
import { setJammerId } from '../../../redux/actions/jammersActions';


import './index.scss';

const LandlordTenants = ({ jamId, jammerId }) => {
    const [jammers, setJammers] = useState([]);
    const [ tenantId, setTenantId] = useState(jammerId);
    
    useEffect(() => {
        DataService.getJammers(jamId)
        .then((res) => {
            setJammers(res)
        })
    }, [])

    useEffect(() => {
        setTenantId(jammerId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jammerId]);


    return (
        <div className="landlord-tenants">
            
            <div className="landlord-tenant-list">
                {jammers !==[] ? 
                    <LandlordTenantsList
                        jammers={jammers} 
                    /> 
                    : 
                    <p>Loading</p>
                }
            </div>

            <div className="landlord-tenants-info">
                {jamId && 
                    <LandlordTenantInfo 
                        tenantId={tenantId} 
                        jamId={jamId} 
                    />
                }
            </div>
        </div>

    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        // nombre de la función que paso como prop: (arg) => 
        // dispatch(nombre del action cre ator(argumento))
        setJammerId: (tenantId) => dispatch (setJammerId(tenantId)),
        getJammerInfo: (jamId, jammerId) => dispatch(getJammerInfo(jamId, jammerId))
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.firebase.auth,
        jamId: state.jamId,
        jamActiveSection: state.jamSection,
        jammerId: state.jammerId
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LandlordTenants);