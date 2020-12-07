import React, { useState, useEffect } from "react";
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';

import Login from '../Auth/Login'
import DataService from '../services/DataService';
import JamsList from '../Lists/JamsList';
import Jam from '../Jam';
import Modal from '../Modal';

import './index.scss'; 
import { setJamId } from '../../redux/actions/navigateActions.js';
import { setJamName, setJamType, setJammers, setJamAdminId, setJamAdminName, setJamDesc, setJamCode, setJamDetails } from '../../redux/actions/jamActions.js';
import {  setUserRole, setUserJams } from '../../redux/actions/userActions';

const Dashboard = ({ 
    jamId,
    setJamAdminId,
    setJamAdminName,
    setJamCode,
    setJamDesc,
    setJamDetails,
    setJammers,
    setJamName,
    setJamType,
    setUserJams,
    setUserRole,
    userId,
    userJams,
}) => {
    const [jamsList, setJamsList] = useState([]);
    const [jamInfo, setJamInfo] = useState({});

    // Use an effect hook to subscribe to the grocery list item stream and
    // automatically unsubscribe when the component unmounts.
    useEffect(() => {
        if(userId) {
            const unsubscribe = DataService.getUserJams(userId, {
                next: querySnapshot => {
                    const jams = [];
                    const result = querySnapshot.docs.map(docSnapshot => {
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
        const {jamName, adminId, adminName, jamType ,jamDesc, jamDetails, jamCode } = res;
        const userRole = userId === res.adminId ? 'Admin' : 'Guest';
       
        // Info en el state
        setJamInfo(res);

        // Info en Redux
        setUserRole(userRole)
        setJamName(jamName)
        setJamAdminId(adminId);
        setJamDesc(jamDesc);
        setJamAdminName(adminName);
        setJamType(jamType)
        setJamDetails(jamDetails)
        setJamCode(jamCode)
        setJammers(jammers)
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
            )

            }
            
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
    setJammers
}) (Dashboard);

