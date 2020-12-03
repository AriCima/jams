
import React, { Fragment } from 'react';

import StudentJammerCardAdmin from './StudentJammerCard';

import Calculations from '../../../services/Calculations';

// CSS
import './index.scss';

const StudentJammersList = ({ jammers }) => {

    const myRoomMates = Calculations.getMyRoomMates(jammers);

    const renderJammersList = () => {
        return myRoomMates.map((rM, i) => {
            return (
                <React.Fragment key={i}>
                    <StudentJammerCardAdmin jI={rM} />
                </React.Fragment>
            )
        })
    }

    return (

        <Fragment>
            { jammers ? renderJammersList() : <p>Loading</p>}
        </Fragment>

    );   
};

export default StudentJammersList;