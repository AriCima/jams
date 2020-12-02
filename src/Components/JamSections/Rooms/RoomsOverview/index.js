import React from 'react';
import { connect } from 'react-redux';

import moment from 'moment';
import isEmpty from 'lodash/isEmpty';

import {setSubSection } from '../../../../redux/actions/navigateActions';
import './index.scss';

const RoomsOverview = ({ rooms, jamJammers, setSubSection }) => {    

    const showRoomInfo = (roomNr) => {
        setSubSection(roomNr)
    };

    const renderRoomsChart = () => jamJammers.map((jj, i) => {
        const currentTenant = jj.currentTenant;
        const roomNr =i+1;
        const stringNr = roomNr.toString();
        return(
            <tr
                onClick={() => {
                    showRoomInfo(i)
                }}
                key={i}
            >
                {isEmpty(currentTenant)
                    ? (
                        <>
                            <td id="number-column">{stringNr}</td>
                            <td id="vacant-cell" colspan="5">CURRENTLY VACANT</td>
                        </>
                    )
                    : (
                        <>
                            <td id="number-column">{stringNr}</td>
                            <td className="inner">{currentTenant.firstName} {currentTenant.lastName}</td>
                            <td>{moment(currentTenant.checkIn).format('DD-MMM-YYYY')}</td>
                            <td>{moment(currentTenant.checkOut).format('DD-MMM-YYYY')}</td>
                            <td>{currentTenant.rent} €</td>
                            <td>{currentTenant.deposit} €/Mo</td>
                        </>

                    )}
            </tr>
        )
    }
    );
    return (

            <table id="rooms-info-chart">
                <tr>
                    <th id="number-column">Room Nr</th>
                    <th>Tenant Name</th>
                    <th>Check-In</th>
                    <th>Check-Out</th>
                    <th>Rent</th>
                    <th>Deposit</th>
                </tr>
                {rooms.length !== 0 && renderRoomsChart()}
            </table>

    );
};
const mapStateToProps = (state) => {
    const { jamId } = state.nav;
    const { jamJammers } = state.jamInfo
    return { jamId, jamJammers }
    
};
export default connect(mapStateToProps, { setSubSection })(RoomsOverview);