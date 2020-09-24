import React, { useState, useEffect } from "react";

import { connect } from 'react-redux';
import { setUserRole, setUserId } from '../../redux/actions/userActions.js'
import Login from '../Auth/Login'
import DataService from '../services/DataService';
import JamsList from '../Lists/JamsList';
import Jam from '../Jam';

import './index.scss'; 
import { setJamId } from "../../redux/actions/navigateActions.js";
import { setJamName, setJamAdminId, setJamAdminName } from "../../redux/actions/jamActions.js";

const Dashboard = ({ auth, jamId, setUserRole, setUserId, setJamName, setJamAdminId, setJamAdminName  }) => {

    const userId = auth.uid;

    const [jamsList, setJamsList] = useState([]);
    const [jamInfo, setJamInfo] = useState({})

    useEffect(() => {
        if (userId) {
            DataService.getUserJams(userId)
            .then(result => {
                setJamsList(result);
            })
            .catch(err => console.log(err));
        }
    }, [userId]);


    useEffect(() => {
        jamId && getJamInfo(jamId);
    }, [jamId]);

    const getJamInfo = async (jamId) => {
        const res = await DataService.getJamInfoById(jamId);
        const {jamName, adminId, adminName } = res;
        const userRole = userId === res.adminId ? 'Admin' : 'Guest';
        setUserRole(userRole)
        setUserId(userId)
        setJamInfo(res);
        setJamName(jamName)
        setJamAdminId(adminId);
        setJamAdminName(adminName);
    }

    useEffect((jamInfo) => {
       jamInfo && setJamInfo(jamInfo)
    }, [jamInfo])

    const renderJam = jamId && jamInfo;

    return (
        <div className="dashboard">
            { !userId ? (
                <div className="login-board">
                    <Login />
                </div>
            ):(
                <>
                <aside className="jams-list">
                    {jamsList ?  <JamsList userJams={jamsList}/> : <div><p>no jams yet</p></div>}
                </aside>
                <div className="jam-screen">
                    {renderJam ? <Jam userId={userId} jamId={jamId} jamInfo={jamInfo} /> : <div><p>select a Jam</p></div>}
                </div>
                </>
            )

            }
            
        </div>
    );
}

const mapStateToProps = state => {
    const jamId = state.nav.jamId;
    return {
        jamId,
        auth: state.firebase.auth,
        userJams: state.userJams,
    };
};

export default connect(mapStateToProps, {setUserRole, setUserId, setJamName, setJamId, setJamAdminId, setJamAdminName}) (Dashboard);

