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
import { setJamName, setJamType, setJamAdminId, setJamAdminName, setJamDesc, setJamDetails } from '../../redux/actions/jamActions.js';
import {  setUserRole, setUserJams } from '../../redux/actions/userActions';

const Dashboard = ({ 
    jamId,
    modalState,
    setJamAdminId,
    setJamAdminName,
    setJamDesc,
    setJamDetails,
    setJamName,
    setJamType,
    setUserJams,
    setUserRole,
    userId,
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
        const {jamName, adminId, adminName, jamType ,jamDesc, jamDetails } = res;
        console.log('jamDetails: ', jamDetails);
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
    };

    const renderJam = jamId && !isEmpty(jamInfo);
    const renderJamsList = jamsList.length > 0;
    const showModal = modalState === 'open'
    return (
        <div className="dashboard">
            { !userId ? (
                <div className="login-board">
                    <Login />
                </div>
            ):(
                <>
                <aside className="jams-list">
                    {renderJamsList && <JamsList userJams={jamsList} /> }
                </aside>
                <div className="jam-screen">
                    {showModal && <Modal />}
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
    const { userId, userRole } = state.userInfo;
    const { modalState, } = state.modal;

    return { jamId, userId, modalState, userRole, userJams: state.userJams };
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
}) (Dashboard);

