import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';

import DataService from '../../../../services/DataService';
import Calculations from '../../../../services/Calculations';
import './index.scss';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const RentPaymentsInfo = ({ jamId, rooms, jammers, jamDetails }) => {    
    
    const cTenants = Calculations.getCurrentTenants(jammers);
    const today = new Date();
    const cM = Number(today.getMonth()); // current Month in numbers
    const currentMonth = months[cM];
    let currentPayments = [];


    for (let i = 0; i < cTenants.length; i++) {
        const { userId, rentsArray, firstName, lastName, roomNr } = cTenants[i];
        // const teoricalRoomRent = rooms.filter(e => e.roomNr).rent;
        const currentMonthRent = rentsArray[cM];
        const tenantPayment = {firstName, lastName, roomNr, userId, currentMonthRent};
        currentPayments.push(tenantPayment);
    };

    const takeMeToTenantInfo

    const renderTenantsPayments = () => currentPayments.map(((cP, userId) => {
        
        if (cp.currentMonthRent.paid) return;

        return (
            <div
                className="rent-payment-line"
                key={userId}
                onCLick={takeMeToTenantInfo(cp.userId)}
            >
                <div className="rent-payment-block">
                    {cP.firstName} {cP.lastName}
                </div>
                <div className="rent-payment-block">
                    {cp.roomNr}
                </div>
                <div className="rent-payment-block">
                    {cp.currentMonthRent.rent}
                </div>
            </div>
        )
    }
    )

    return (
        <div className="rent-payments-wrapper">



        </div>
    );
};

const mapStateToProps = state => {
    const jamId = state.nav.jamId;
    const { userId } = state.userInfo;
    const { jamDetails, jammers, rooms } = state.jamInfo

    return { jamId, jamDetails, userId, jammers, rooms };
};
export default connect(mapStateToProps, null)(RentPaymentsInfo);