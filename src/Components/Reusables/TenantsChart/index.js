import React, { useState }  from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import { setDocType, setDocId, setEditable } from "../../../redux/actions/docsActions";
import { setSection } from '../../../redux/actions/navigateActions';

import './index.scss';

const TenantsChart = ({ jammers, rooms, setDocType, setSection, setDocId, setEditable}) => {

    const [ activeTab, setActiveTab ] = useState('current');
    
    const takeMeToTenantInfo = (e, userId) => {
        e.preventDefault();
        setSection('Tenants')
        setDocType('TENANT-FORM');
        setDocId(userId); // tenant's userId
        setEditable('true');
    };

    const renderTenantsRow = () => {
        
        let filteredTenants;

        switch (activeTab) {
            case 'future':
                filteredTenants = jammers.futureTenants;
                break;
            case 'former':
                filteredTenants = jammers.formerTenants;
                break;
            default:
                filteredTenants = jammers.currentTenants;
        }

        return filteredTenants.map((ft, i) => {
            return (
                <tr
                    className="tenants-values-row"
                    onClick={(e) => {takeMeToTenantInfo(e, ft.userId)}}
                >
                    <td className="tenant-values firstTitle"><p>{ft.firstName} {ft.lastName}</p></td>
                    {!rooms && <td className="tenant-values"><p>{ft.roomNr}</p></td>}
                    <td className="tenant-values"><p>{moment(ft.checkIn).format('DD-MMM-YYYY')}</p></td>
                    <td className="tenant-values"><p>{moment(ft.checkOut).format('DD-MMM-YYYY')}</p></td>
                    <td className="tenant-values"><p>{ft.rent} €</p></td>
                    <td className="tenant-values"><p>{ft.deposit} €/Mo</p></td>
                </tr>
            )
        })
    }
    
    console.log('activeTab: ', activeTab);
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
                        {!rooms && <th className="row-title"><p>Room Nr</p></th>}
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

export default connect(null, { setDocType, setSection, setDocId, setEditable })(TenantsChart);
