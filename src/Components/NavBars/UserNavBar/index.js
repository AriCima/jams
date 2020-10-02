// COOL STYLE https://codepen.io/egoens/pen/NxejgJ

import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import Calculations from '../../services/Calculations';
import { setSection, setSubSection } from     "../../../redux/actions/navigateActions";
import { setDocType, setDocId, setEditable } from '../../../redux/actions/docsActions';
import './index.scss';


const JammerNavBar = ({ setSection, jamType, jamName }) => {
    
    const [jamSections, setJamSections] = useState([])
   
    const onsetJamSection = (section)=> {
        setSection(section)
    };

    useEffect(() => {
        const sections = Calculations.getJamUserSections(jamType)
        setJamSections(sections)
    }, [jamType, setJamSections])


    const renderUserNavBar = () => {
        console.log('jamSections: ', jamSections);
        return jamSections.map((section, id) => {
            return jamType === 'chat' ? 
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
            
        })
    };

    return ( 
        <>
            {jamType !== 'chat' ? 
                (
                    <Fragment>
                        <div className="jamNavBar-left">
                            <div className="jamNavBar-jamName">
                                <p>{jamName}</p>
                            </div>
                        </div>
                        <div className="jamNavBar-right">
                            {renderUserNavBar()}
                        </div>
                    </Fragment>
                ) : (
                    <div className="jamNavBar-chat">
                        {renderUserNavBar()}
                    </div>
                )
            }
        </>
    );

};


const mapStateToProps = (state) => {
    const { section, subSection } = state.nav;
    const { jamName, jamType } = state.jamInfo
    return { section, subSection, jamType, jamName }
};

export default connect(mapStateToProps, { setSection, setSubSection, setDocType, setDocId, setEditable })(JammerNavBar);
