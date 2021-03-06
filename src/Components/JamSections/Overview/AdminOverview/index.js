import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWalking, faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';

import OccupancyGraph from './OccupancyGraph';
import DataService from '../../../services/DataService';
import Calculations from '../../../services/Calculations';
import CustomDialog from '../../../Modal/CustomDialog';
import RentPaymentsInfo from './RentPayments';
import { setDocType, setDocId, setEditable } from "../../../../redux/actions/docsActions";
import { setSection } from '../../../../redux/actions/navigateActions';
import './index.scss';
import { DayPicker } from 'react-dates';

const AdminOverview = ({ jamId, rooms, jammers, jamDetails, setSection, setDocType, setDocId, setEditable }) => {    
    
    const [occupancy, setOccupancy ] = useState(0);
    const [incomes, setIncomes ] = useState(0);
    const [activity, setActivity ] = useState([]);
    const [showMissingInfo, setShowMissingInfo ] = useState(false);
    const [missingInfoArr, setMissingInfoArr] = useState([]);
    const [pendingRents, setPendingRents] = useState([]);

    useEffect(() => {
        const nrOfRooms = jamDetails.nrOfRooms;
        DataService.getJammers(jamId)
        .then((res) => {
            const jammersBis = Calculations.removeAmdinFromJammers(res);  // CHAPUZA --> reemplazar jammerBis por Jammers de Redux
            
            const currentOccupancy = Calculations.getCurrentOccupancy(jammersBis, nrOfRooms);
            setOccupancy(currentOccupancy);

            const currentIncomes = Calculations.getCurrentIncomes(jammersBis);
            setIncomes( currentIncomes)

            const futureChecks = Calculations.getFutureChecks(jammersBis);
            setActivity(futureChecks)
        })

        // TO CHECK IF ALL ROOMS INFO HAS BEEN FILLED
        getAllRoomsInfo(jamId);


    }, [jamId, jamDetails])

    const takeMeToTenantInfo = (e, userId) => {
        e.preventDefault();
        setSection('Tenants')
        setDocType('TENANT-FORM');
        setDocId(userId); // tenant's userId
        setEditable('true');
    };


    const getAllRoomsInfo = async (jamId) => {
        const res = await DataService.getJamRooms(jamId);
        const roomsInfoStatus = Calculations.missingRoomsInfo(res);
        if (roomsInfoStatus.missingInfo) {
            setShowMissingInfo(true);
            setMissingInfoArr(roomsInfoStatus.missingArr);
        }
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
                        <p>On <span>{isOut ? moment(check.date).format("DD-MMM-YYYY"): moment(check.date).format("DD-MMM-YYYY")}</span> {check.firstName} {check.lastName} checks {isOut ? 'out' : 'in'}</p> 
                    </div>
                </div>
            )

        })
    };

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

            <CustomDialog
                mustOpen={showMissingInfo}
                info={missingInfoArr}
                dialogType="pending-room-info"
                actionMessage="Take me to rooms form"
            />

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
    const { jamDetails, jammers, rooms } = state.jamInfo

    return { jamId, jamDetails, userId, jammers, rooms };
};
export default connect(mapStateToProps, { setDocType, setSection, setDocId, setEditable })(AdminOverview);