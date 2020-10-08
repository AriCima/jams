
import React, { Fragment } from 'react';
import isEmpty from 'lodash/isEmpty';
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
            { !isEmpty(jammersList) ? renderJammersList() : <p>Loading</p>}
        </Fragment>
    );
};

export default JammersList;