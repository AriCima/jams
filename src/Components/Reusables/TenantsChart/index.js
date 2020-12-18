import React, { useState }  from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';

import { setDocType, setDocId, setEditable } from "../../../redux/actions/docsActions";
import { setSection } from '../../../redux/actions/navigateActions';
import Calculations from '../../services/Calculations';

import './index.scss';

const TenantsChart = ({
    jammersList,
    section,
    subSection,
    setDocType,
    setSection,
    setDocId
}) => {
    
    const [ activeTab, setActiveTab ] = useState('current');
    
    const takeMeToTenantInfo = (e, userId) => {
        e.preventDefault();
        setSection('Tenants')
        setDocType('TENANT-FORM');
        setDocId(userId); // tenant's userId
        // setEditable('true');
    };

    const showRoomNr = section === 'Tenants' || (section === 'Rooms' && subSection === '');

    const renderTenantsRow = () => {
        
        let filteredTenants = [];

        switch (activeTab) {
            case 'future':
                let orderedFut = [];
                if(jammersList.futureTenants.length > 0) {
                    orderedFut = Calculations.sortByCheckInAsc(jammersList.futureTenants)
                };
                filteredTenants = orderedFut;
                break;
            case 'former':
                filteredTenants = jammersList.formerTenants;
                break;
            default:
                if (!isEmpty(jammersList.currentTenant)) {
                    filteredTenants = jammersList.currentTenant;
                }
        }
        

        if ( filteredTenants.length > 0 ) {
            return filteredTenants.map((ft, i) => {
                return (
                    <tr
                        className="tenants-values-row"
                        onClick={(e) => {takeMeToTenantInfo(e, ft.userId)}}
                    >
                        <td className="tenant-values firstTitle"><p>{ft.firstName} {ft.lastName}</p></td>
                        {showRoomNr && <td className="tenant-values"><p>{ft.roomNr}</p></td>}
                        <td className="tenant-values"><p>{moment(ft.checkIn).format('DD-MMM-YYYY')}</p></td>
                        <td className="tenant-values"><p>{moment(ft.checkOut).format('DD-MMM-YYYY')}</p></td>
                        <td className="tenant-values"><p>{ft.rent} €</p></td>
                        <td className="tenant-values"><p>{ft.deposit} €/Mo</p></td>
                    </tr>
                )
            })
        } else {
            return (
                <tr className="tenants-values-row">
                    <td className="no-tenants-row" colspan="6"><p>NO TENANTS</p></td>
                </tr>

            )
        }

    }
    
    return(
    
    <div className="tenants-chart-wrapper">
        
                <table id="tenants-chart">

                    <tr id="tabs-row">
                        <td
                            onClick={(e) => {e.preventDefault(); setActiveTab('current')}}
                            className={`tab-value ${activeTab === 'current' ? "activeTab" : ""}`}
                            
                        >
                            <p>Current Tenants</p>
                        </td>
                        <td
                            onClick={(e) => {e.preventDefault(); setActiveTab('future')}}
                            className={`tab-value ${activeTab === 'future' ? "activeTab" : ""}`}>
                            <p>Future Tenants</p>
                        </td>
                        <td 
                            onClick={(e) => {e.preventDefault(); setActiveTab('former')}}
                            className={`tab-value ${activeTab === 'former' ? "activeTab" : ""}`}>
                            <p>Former Tenants</p>
                        </td>
                    </tr>
                </table>
                <table id="tenants-rows-table">
                    <tr id="titles-row">
                        <th className="row-title firstTitle" ><p>Name</p></th>
                        {showRoomNr && <th className="row-title"><p>Room Nr</p></th>}
                        <th className="row-title"><p>Check-In</p></th>
                        <th className="row-title"><p>Check-Out</p></th>
                        <th className="row-title"><p>Rent</p></th>
                        <th className="row-title lastTitle"><p>Deposit</p></th>
                    </tr>

                    {renderTenantsRow()}

                </table>
    </div>

  )
}

const mapStateToProps = (state) => {
    const { jamId, section, subSection } = state.nav;
    const { nrOfRooms } = state.jamInfo.jamDetails;

    return { jamId, section, subSection, nrOfRooms }
    
};

export default connect(mapStateToProps, { setDocType, setSection, setDocId, setEditable })(TenantsChart);
