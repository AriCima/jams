import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import {setSubSection } from '../../../../redux/actions/navigateActions';
import './index.scss';

const RoomsOverview = ({ roomsTenants, setSubSection }) => {    

    const showRoomInfo = (roomNr) => {
        setSubSection(roomNr)
    };

    const renderRoomsChart = () => roomsTenants.map((jj, i) => {
        const currentTenant = jj.currentTenants;
        const roomNr =i+1;
        const stringNr = roomNr.toString();
        const isVacant = currentTenant.length === 0;
        return(
            <tr
                onClick={() => {
                    showRoomInfo(i)
                }}
                key={i}
            >
                {isVacant ? 
                    (
                        <>
                            <td id="number-column">{stringNr}</td>
                            <td id="vacant-cell" colspan="5">CURRENTLY VACANT</td>
                        </>
                    )
                    : (
                        <>
                            <td id="number-column">{stringNr}</td>
                            <td className="inner">{currentTenant[0].firstName} {currentTenant[0].lastName}</td>
                            <td>{moment(currentTenant[0].checkIn).format('DD-MMM-YYYY')}</td>
                            <td>{moment(currentTenant[0].checkOut).format('DD-MMM-YYYY')}</td>
                            <td>{currentTenant[0].rent} €</td>
                            <td>{currentTenant[0].deposit} €/Mo</td>
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
                {roomsTenants.length !== 0 && renderRoomsChart()}
            </table>

    );
};
const mapStateToProps = (state) => {
    const { jamId } = state.nav;
    return { jamId }
    
};
export default connect(mapStateToProps, { setSubSection })(RoomsOverview);