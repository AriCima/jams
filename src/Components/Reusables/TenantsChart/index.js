import React, { useEffect, useState }  from 'react';
import isEmpty from 'lodash/isEmpty';

import './index.scss';

const TenantsChart = ({ jammers }) => {

    const [ activeTab, setActiveTab ] = useState('current');

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
                <tr className="tenants-values-row">
                    <th>{ft.firstName} {ft.lastName}</th>
                    <th>{ft.roomNr}</th>
                    <th>{ft.checkIn}</th>
                    <th>{ft.checkOut}</th>
                    <th>{ft.rent}</th>
                    <th>{ft.deposit}</th>
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
                <table id="tenants-rows">
                    <tr id="titles-row">
                        <th className="row-title"><p>Name</p></th>
                        <th className="row-title"><p>Room Nr</p></th>
                        <th className="row-title"><p>Check-In</p></th>
                        <th className="row-title"><p>Check-Out</p></th>
                        <th className="row-title"><p>Rent</p></th>
                        <th className="row-title"><p>Deposit</p></th>
                    </tr>

                    {renderTenantsRow()}

                </table>
    </div>

  )
}


export default TenantsChart;
