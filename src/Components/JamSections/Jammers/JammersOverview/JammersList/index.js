
import React, { Fragment } from 'react';
import JammerCard from './JammerCard';

import './index.scss';

const JammersList = ({ jammersList }) => {

    const renderJammersList = () => {
        return jammersList.map((tL, i) => {
            return (
                <React.Fragment key={i}>
                    <JammerCard
                        tL={tL} 
                    />
                </React.Fragment>
            )
        })
    }

    return (
        <Fragment>
            { jammersList ? renderJammersList() : <p>Loading</p>}
        </Fragment>
    );
};

export default JammersList;