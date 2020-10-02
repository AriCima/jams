
import React, { Fragment } from 'react';

// COMPONENTS
import StudentJammerCardAdmin from './StudentJammerCard';


// CSS
import './index.css';

const StudentJammersList = (props) => {

    const { jammers, jamInfo } = props;

    const renderJammersList = () => {
        return jammers.map((jammerInfo, i) => {
            return (
                <React.Fragment key={i}>
                    <StudentJammerCardAdmin jamInfo={jamInfo} jI={jammerInfo} />
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