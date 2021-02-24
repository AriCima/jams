import React, { useState, useEffect } from "react";
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';

import Login from '../Auth/Login'
import DataService from '../services/DataService';
import Calculations from '../services/Calculations';
import { EventEmitter } from '../services/utils/EventEmitter'
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
    userId
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
        
        EventEmitter.removeListener('newRoomAdded');
    
        EventEmitter.on('newRoomAdded', (() => {
            getRoomsInfo(jamId);
        }));
    
        return () => {
          EventEmitter.removeListener('newRoomAdded');
        }

    }, [jamId]);

    const getRoomsInfo = async (jamId) => {
        const jammers = await DataService.getJammers(jamId);
        let rooms = await DataService.getJamRooms(jamId);
        const nrOfRooms = rooms.length.toString()
        
        const editedJammers = Calculations.removeAmdinFromJammers(jammers);
        const tenantsByRooms = Calculations.getTenantsByRooms(editedJammers, nrOfRooms);
        const organizedTenantsByRoom = Calculations.getOrganizedTenants(tenantsByRooms, nrOfRooms);
        const sortedRooms = Calculations.sortByRoomNr(rooms)
        
        if (rooms.length > 0) {
            for (let i = 0; i < rooms.length; i++) {
                const oT = organizedTenantsByRoom[i];
                sortedRooms[i].currentTenant = oT.currentTenant;
                sortedRooms[i].formerTenants = oT.formerTenants;
                sortedRooms[i].futureTenants = oT.futureTenants;
            }
        }
        setJammers(editedJammers);
        setJamRooms(sortedRooms);
        setNumberOfRooms(nrOfRooms);
        // setUserRole(userRole);
    }

    const getJamInfo = async (jamId) => {
        const res = await DataService.getJamInfoById(jamId);
        setJamInfo(res); // Info en el state
        const {jamName, adminId, adminName, jamType ,jamDesc, jamDetails, jamCode } = res;
        const userRole = userId === res.adminId ? 'Admin' : 'Guest';
        // Info en Redux
        setUserRole(userRole);
        setJamType(jamType);
        setJamAdminId(adminId);
        setJamAdminName(adminName);
        setJamCode(jamCode);
        setJamDesc(jamDesc);
        setJamDetails(jamDetails);
        setJamName(jamName);

        switch (jamType) {
            case 'rooms-rental':
                const jammers = await DataService.getJammers(jamId);
                let rooms = await DataService.getJamRooms(jamId);
                const nrOfRooms = rooms.length.toString()
                
                const editedJammers = Calculations.removeAmdinFromJammers(jammers);
                const tenantsByRooms = Calculations.getTenantsByRooms(editedJammers, nrOfRooms);
                const organizedTenantsByRoom = Calculations.getOrganizedTenants(tenantsByRooms, nrOfRooms);
                const sortedRooms = Calculations.sortByRoomNr(rooms)
                
                if (rooms.length > 0) {
                    for (let i = 0; i < rooms.length; i++) {
                        const oT = organizedTenantsByRoom[i];
                        sortedRooms[i].currentTenant = oT.currentTenant;
                        sortedRooms[i].formerTenants = oT.formerTenants;
                        sortedRooms[i].futureTenants = oT.futureTenants;
                    }
                }
                setJammers(editedJammers);
                setJamRooms(sortedRooms);
                setNumberOfRooms(nrOfRooms);
            break;
            case 'chat':
                // Info en Redux
                setJammers(res.jammers);
                setJamRooms('');
                setNumberOfRooms('');
                break;
            default:
                return;

        }

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

