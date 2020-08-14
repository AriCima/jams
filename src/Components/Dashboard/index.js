import React, { useState, useEffect } from "react";

import { connect } from 'react-redux';
import Login from '../Auth/Login'
// import { getUserJams } from '../../redux/actions/jamsActions';
// import { getJamInfo } from '../../redux/actions/jamInfo';
import { setSection, setSubSection } from '../../redux/actions/navigateActions';


import DataService from '../services/DataService';
// import Calculations from '../services/Calculations';

// COMPONENTS
import JamsList from '../Lists/JamsList';
import Jam from '../Jam';

// CSS
import './index.scss'; 

const Dashboard = ({ auth, jamId  }) => {

    const userId = auth.uid;

    const [jamsList, setJamsList] = useState([]);
    const [jamInfo, setJamInfo] = useState({})

    useEffect(() => {
        if (userId) {
            DataService.getUserJams(userId)
            .then(result => {
                console.log('result: ', result);
                setJamsList(result);
            })
            .catch(err => console.log(err));
        }
    }, [userId]);


    useEffect(() => {
        // if(jamId) {
        //     console.log('jamId: ', jamId);
        //     DataService.getJamInfoById(jamId)
        //     .then(res => {
        //         const jamInfo = res;
        //         setJamInfo(jamInfo)
        //     })
        // }
        jamId && getJamInfo(jamId)
    }, [jamId]);

    const getJamInfo = async (jamId) => {
        const res = await DataService.getJamInfoById(jamId);
        setJamInfo(res);
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

// const mapDispatchToProps = (dispatch) => {
//     return {
//         // getUserJams: (userId) => dispatch(getUserJams(userId)),
//         getJamInfo: (jamId) => dispatch(getJamInfo(jamId)),
//     };
// };

const mapStateToProps = state => {
    const jamId = state.nav.jamId;
    return {
        // jamId: state.jamId,
        // jamInfo: state.jamInfo,
        jamId,
        auth: state.firebase.auth,
        userJams: state.userJams,
    };
};

// export default connect(mapStateToProps, mapDispatchToProps) (Dashboard);
export default connect(mapStateToProps, null) (Dashboard);

