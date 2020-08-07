import React, { useState, useEffect } from "react";

import { connect } from 'react-redux';
import Login from '../Auth/Login'
import { getUserJams } from '../../redux/actions/jamsActions';
import { getJamInfo } from '../../redux/actions/jamInfo';

import DataService from '../services/DataService';
import Calculations from '../services/Calculations';

// COMPONENTS
import JamsList from '../Lists/JamsList';
import Jam from '../Jam';

// CSS
import './index.scss'; 

const Dashboard = ({ auth, getJamInfo, jamId, jamInfo }) => {

    const [ jamsList, setJamsList ] = useState([]);
    const [ ownStudentsFlats, setOwnStudentsFlats] = useState([]);
    const [ userId, setUserId ] = useState('');

    useEffect(() => {
        const userId = auth.uid;
        if (userId) {
            setUserId(userId)
            DataService.getUserJams(userId)
            .then(result => {
                setJamsList(result);
            })
            .catch(err => console.log(err));
        }
    }, [auth.uid]);

    useEffect(() => {
        jamId && getJamInfo(jamId)
    }, [jamId]);

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
                    {jamId ? <Jam jamId={jamId} jamInfo={jamInfo} /> : <div><p>select a Jam</p></div>}
                </div>
                </>
            )

            }
            
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        // getUserJams: (userId) => dispatch(getUserJams(userId)),
        getJamInfo: (jamId) => dispatch(getJamInfo(jamId)),
    };
};

const mapStateToProps = state => {
    return {
        jamId: state.jamId,
        jamInfo: state.jamInfo,
        auth: state.firebase.auth,
        userJams: state.userJams,
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (Dashboard);
