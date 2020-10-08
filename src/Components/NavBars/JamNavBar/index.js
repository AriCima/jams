// COOL STYLE https://codepen.io/egoens/pen/NxejgJ
import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments} from '@fortawesome/free-solid-svg-icons'

import Calculations from '../../services/Calculations';
import { setSection, setSubSection } from     "../../../redux/actions/navigateActions";
import { setDocType, setDocId, setEditable } from '../../../redux/actions/docsActions';

import './index.scss';

const JamNavBar = ({ userRole, setSection, setSubSection, setDocType, setDocId, setEditable, jamName, jamType}) => {

    const [jamSections, setJamSections] = useState([]);

    const onsetJamSection = (section) => {
        setSection(section);
        setSubSection('');
        setDocType('none');
        setDocId('');
        setEditable(false);
    };

    useEffect(() => {
        let sections
        if (userRole === 'Admin') {
            sections = Calculations.getJamAdminSections(jamType);
        } else {
            sections = Calculations.getJamGuestSections(jamType);
        }
        setJamSections(sections);
    }, [jamType, userRole]);


    const renderLandlordNavBar = () => {
        return jamSections.map((section, id) => {
            return jamType === 'Chat' ?
                (
                    <div
                        className="jamNavBar-item" 
                        key={id}
                        onClick={() => onsetJamSection(`${section}`)}
                    >
                        <FontAwesomeIcon className="navBar-icon-style" icon={faComments} />
                    </div>
                ):(
                    <div
                        className="jamNavBar-item"
                        key={id}
                        onClick={() => onsetJamSection(`${section}`)}
                    >
                        {section}
                    </div>
                );
        });
    };

    return ( 
        <>
            {jamSections === undefined ? <p>NO JAM SELECTED</p> :(
                <>
                    {jamType !== 'chat' ?
                        (
                            <>
                                <div className="jamNavBar-left">
                                    <div className="jamNavBar-jamName">
                                        <p>{jamName}</p>
                                    </div>
                                </div>
                                <div className="jamNavBar-right">
                                    {renderLandlordNavBar()}
                                </div>
                            </>
                        ) : (
                            <div className="jamNavBar-chat">
                                {renderLandlordNavBar()}
                            </div>
                        )
                    }
                </>
            )}
        </>
    );

};

const mapStateToProps = (state) => {
    const { section, subSection } = state.nav;
    const { userRole } = state.userInfo;
    const { jamName, jamType } = state.jamInfo;
    return { section, subSection, userRole, jamName, jamType }
};

export default connect(mapStateToProps, { setSection, setSubSection, setDocType, setDocId, setEditable })(JamNavBar);
