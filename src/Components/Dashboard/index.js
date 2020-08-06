import React, { useState, useEffect } from "react";

import { connect } from 'react-redux';
import { getUserJams } from '../../redux/actions/jamsActions';
import { getJamInfo } from '../../redux/actions/jamInfo';

import DataService from '../services/DataService';
import Calculations from '../services/Calculations';

// COMPONENTS
import JamsList from '../Lists/JamsList';
import Jam from '../Jam';

// CSS
import './index.css'; 

const Dashboard = ({ auth, userJams, getJamInfo, jamId, jamInfo }) => {

    const [ jamsList, setJamsList ] = useState([]);
    const [ ownStudentsFlats, setOwnStudentsFlats] = useState([]);

    useEffect(() => {
        const userId = auth.uid;
        DataService.getUserJams(userId)
            .then(result => {
                setJamsList(result);
                const x = Calculations.getOnwStudentsFlats(result, userId);
                setOwnStudentsFlats(x);
            })
            .catch(err => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth.uid, userJams]);

    useEffect(() => {
        jamId && getJamInfo(jamId)
    }, [jamId]);

    return (
        <div className="dashboard">
            <aside className="jams-list">

                {jamsList && 
                    <JamsList userJams={jamsList}/>
                }
            </aside>

            <div className="jam-screen">
                {/* { jamId === null ?
                    <JamsOverview ownStudentsFlats={ownStudentsFlats} />
                    :
                    <Jam jamId={jamId} jamInfo={jamInfo} />
                } */}
                <Jam jamId={jamId} jamInfo={jamInfo} />
            </div>

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
