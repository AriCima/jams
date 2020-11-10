import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWalking, faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';

import OccupancyGraph from './OccupancyGraph';
import DataService from '../../../services/DataService';
import Navigation from '../../../services/Navigation';
import Calculations from '../../../services/Calculations';
import { setDocType, setDocId, setEditable } from "../../../../redux/actions/docsActions";
import { setSection } from '../../../../redux/actions/navigateActions';
import './index.scss';

const AdminOverview = ({ jamId, jamDetails, setSection, setDocType, setDocId, setEditable }) => {    
    
    const [occupancy, setOccupancy ] = useState(0);
    const [incomes, setIncomes ] = useState(0);
    const [activity, setActivity ] = useState([]);

    useEffect(() => {
        const nrOfRooms = jamDetails.nrOfRooms;
        DataService.getJammers(jamId)
        .then((res) => {
            const jammers = Calculations.removeAmdinFromJammers(res);
            
            const currentOccupancy = Calculations.getCurrentOccupancy(jammers, nrOfRooms);
            setOccupancy(currentOccupancy);

            const currentIncomes = Calculations.getCurrentIncomes(jammers);
            setIncomes( currentIncomes)

            const futureChecks = Calculations.getFutureChecks(jammers);
            setActivity(futureChecks)
        })

    }, [jamId, jamDetails])

    const takeMeToTenantInfo = (e, userId) => {
        e.preventDefault();
        setSection('Tenants')
        setDocType('TENANT-FORM');
        setDocId(userId); // tenant's userId
        setEditable('true');
    };


    const renderActivity = () => {
        return activity.map((check, i) => {
            const isOut = check.type === 'chkOut';
            return (
                <div
                    className="activity-line"
                    onClick={(e) => takeMeToTenantInfo(e, check.userId)}
                >
                    <div className={`activity-img${isOut ? '-isOut':''}`}>
                        <FontAwesomeIcon
                            className={`walking-icon${isOut ? '-isOut':''}`}
                            icon={faWalking}
                        />
                        <FontAwesomeIcon
                            className={`door-icon${isOut ? '-isOut':''}`}
                            icon={faDoorOpen}
                        />
                    </div>
                    <div className="activity-info">
                        <p>On <span>{isOut ? moment(check.checkOut).format("DD-MMM-YYYY"): moment(check.checkIn).format("DD-MMM-YYYY")}</span> {check.firstName} {check.lastName} checks {isOut ? 'out' : 'in'}</p> 
                    </div>
                </div>
            )

        })
    }

    const showActivity = activity.length !== 0;

    return (
        <div className="admin-overview-wrapper">

           <div className="overview-activity">
               <div className="overview-section-title">
                   <h2>Ins &amp; Outs</h2>
               </div>
               <div className="overview-section-activity">
                    {showActivity && renderActivity()}
               </div>
           </div>



            <div className="overview-ocupation">
                <div className="ocupation-label">
                    <p>Occupancy: {Math.floor(occupancy)}%</p>
                </div>
                <OccupancyGraph occupancy={occupancy}/>
            </div>

            <div className="overview-incomes">
                <div className="incomes-label">
                    <p>Month Incomes:</p>
                </div>
                <div className="incomes-value">
                    <p>{incomes} €</p>
                </div>
            </div>



        </div>
    );
};

const mapStateToProps = state => {
    const jamId = state.nav.jamId;
    const { userId } = state.userInfo;
    const { jamDetails } = state.jamInfo

    return { jamId, jamDetails, userId };
};
export default connect(mapStateToProps, { setDocType, setSection, setDocId, setEditable })(AdminOverview);