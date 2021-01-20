import React, { useState, useEffect } from "react";
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';

import Login from '../Auth/Login'
import DataService from '../services/DataService';
import Calculations from '../services/Calculations';
import JamsList from '../Lists/JamsList';
import Jam from '../Jam';
// import ContractEN from '../Common/ContractEN';

import './index.scss'; 
import { setJamId } from '../../redux/actions/navigateActions.js';
import { setJamName, setNumberOfRooms, setJamType, setJammers, setJamRooms, setJamAdminId, setJamAdminName, setJamDesc, setJamCode, setJamDetails } from '../../redux/actions/jamActions.js';
import {  setUserRole, setUserJams } from '../../redux/actions/userActions';

const Dashboard = ({ 
    jamId,
    setJamAdminId,
    setJamAdminName,
    setJamCode,
    setJamDesc,
    setJamDetails,
    setJammers,
    setJamRooms,
    setJamName,
    setJamType,
    setUserJams,
    setUserRole,
    setNumberOfRooms,
    userId,
    userJams,
}) => {
    const [jamsList, setJamsList] = useState([]);
    const [jamInfo, setJamInfo] = useState({});

    // Use an effect hook to subscribe to the jams list item stream and
    // automatically unsubscribe when the component unmounts.
    useEffect(() => {
        if(userId) {
            const unsubscribe = DataService.getUserJams(userId, {
                next: querySnapshot => {
                    const jams = [];
                    querySnapshot.docs.map(docSnapshot => {
                        const j = docSnapshot.data();
                        j.id = docSnapshot.id;
                        jams.push(j);
                    });
                    setUserJams(jams);
                    setJamsList(jams);
                },
                error: () => console.log('failure')
            });
            return unsubscribe;
        }
    }, [userId]);

    useEffect(() => {
        jamId && getJamInfo(jamId, userId);
    }, [jamId]);

    const getJamInfo = async (jamId) => {
        const res = await DataService.getJamInfoById(jamId);
        const jammers = await DataService.getJammers(jamId);
        let rooms = await DataService.getJamRooms(jamId);

        const {jamName, adminId, adminName, jamType ,jamDesc, jamDetails, jamCode } = res;

        const nrOfRooms = rooms.length.toString()
        const userRole = userId === res.adminId ? 'Admin' : 'Guest';
        
        const editedJammers = Calculations.removeAmdinFromJammers(jammers);
        const tenantsByRooms = Calculations.getTenantsByRooms(editedJammers, nrOfRooms);
        const organizedTenantsByRoom = Calculations.getOrganizedTenants(tenantsByRooms, nrOfRooms);
        console.log('organizedTenantsByRoom: ', organizedTenantsByRoom);
        
        const oTL = organizedTenantsByRoom.length; 
        
        if(oTL > 0) {
            for (let i = 0; i < rooms.length; i++) {
                rooms[i].currentTenant = [];
                rooms[i].formerTenants = [];
                rooms[i].futureTenants = [];
                // if(i <= oTL-1) {
                //     const oT = organizedTenantsByRoom[i];
                //     rooms[i].currentTenant = oT.currentTenant;
                //     rooms[i].formerTenants = oT.formerTenants;
                //     rooms[i].futureTenants = oT.futureTenants;
                // } else {
                //     rooms[i].currentTenant = [];
                //     rooms[i].formerTenants = [];
                //     rooms[i].futureTenants = [];
                // }
                const oT = organizedTenantsByRoom[i];
                console.log(' room ', i+1)
                console.log('oT: ', oT);
                console.log('currentTenant: ', oT.currentTenant[0]);
                const elem = oT.currentTenant[0];
                rooms[i].currentTenant.push(elem);
                rooms[i].formerTenants = oT.formerTenants;
                rooms[i].futureTenants = oT.futureTenants;
                console.log('rooms = ', rooms);
            }
            console.log('rooms: ', rooms);
            const sortedRooms = Calculations.sortByRoomNr(rooms)
            console.log('sortedRooms: ', sortedRooms);
            setJamRooms(sortedRooms);
        }

        // Info en el state
        setJamInfo(res);

        // Info en Redux
        setUserRole(userRole);
        setJamName(jamName);
        setJamAdminId(adminId);
        setJamDesc(jamDesc);
        setJamAdminName(adminName);
        setJamType(jamType);
        setJamDetails(jamDetails);
        setJamCode(jamCode);
        setNumberOfRooms(nrOfRooms);
        setJammers(editedJammers);
        // setJamRooms(rooms)
    };

    const renderJam = jamId && !isEmpty(jamInfo);
    const renderJamsList = jamsList.length > 0;

    return (
        <div className="dashboard">
            { !userId ? (
                <div className="login-board">
                    <Login />
                </div>
            ):(
                <>
                <aside className="jams-list">
                    {renderJamsList && <JamsList
                        userJams={jamsList}
                    /> }
                </aside>
                <div className="jam-screen">
                    {renderJam ? 
                        <Jam /> 
                        :
                        <div className="select-jam">
                            {renderJamsList ? <p>select a Jam</p> :  <p>You have no Jams yet, Create or Join</p>}
                        </div>
                    }
                </div>
                </>
            )}
        </div>
    );
}

const mapStateToProps = state => {
    const jamId = state.nav.jamId;
    const { userId, userRole, userJams } = state.userInfo;

    return { jamId, userId, userRole, userJams };
};

export default connect(mapStateToProps, {
    setJamAdminId,
    setJamAdminName,
    setJamDesc,
    setJamDetails,
    setJamId,
    setJamName,
    setJamType,
    setUserJams,
    setUserRole,
    setJamCode,
    setJammers,
    setJamRooms,
    setNumberOfRooms
}) (Dashboard);

