import React, { useState, useEffect } from "react";
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';

import Login from '../Auth/Login'
import DataService from '../services/DataService';
import JamsList from '../Lists/JamsList';
import Jam from '../Jam';

import './index.scss'; 
import { setJamId } from '../../redux/actions/navigateActions.js';
import { setJamName, setJamType, setJamAdminId, setJamAdminName, setJamDesc } from '../../redux/actions/jamActions.js';
import {  setUserRole, setUserJams } from '../../redux/actions/userActions';

const Dashboard = ({ 
    userId,
    jamId,
    setUserRole,
    setUserJams,
    setJamName,
    setJamDesc,
    setJamType,
    setJamAdminId,
    setJamAdminName
}) => {
    const [jamsList, setJamsList] = useState([]);
    const [jamInfo, setJamInfo] = useState({});
    const [uJams, setUJams] = useState([]);

    useEffect(() => {
        if (userId) {
            DataService.getUserJams(userId)
            .then(result => {
                setUserJams(result);
                setUJams(result);
                setJamsList(result);
            })
            .catch(err => console.log(err));
        }       
    }, [userId]);



    useEffect(() => {
        jamId && getJamInfo(jamId, userId);
    }, [jamId]);

    const getJamInfo = async (jamId) => {
        const res = await DataService.getJamInfoById(jamId);
        const {jamName, adminId, adminName, jamType ,jamDesc } = res;
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
    };

    const renderJam = jamId && !isEmpty(jamInfo);

    return (
        <div className="dashboard">
            { !userId ? (
                <div className="login-board">
                    <Login />
                </div>
            ):(
                <>
                <aside className="jams-list">
                    {jamsList ?  
                        <JamsList
                            userJams={jamsList}
                        /> 
                        : 
                        <div><p>no jams yet</p></div>
                    }
                </aside>
                <div className="jam-screen">
                    {renderJam ? 
                        <Jam
                            // userId={userId}
                            // jamId={jamId}
                            // jamInfo={jamInfo}
                        /> 
                        :
                        <div className="select-jam">
                            <p>select a Jam</p>
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
    const { userId, userRole } = state.userInfo;

    return { jamId, userId, userRole, userJams: state.userJams };
};

export default connect(mapStateToProps, {
    setUserRole,
    setUserJams,
    setJamName,
    setJamDesc,
    setJamType,
    setJamId,
    setJamAdminId,
    setJamAdminName
}) (Dashboard);

