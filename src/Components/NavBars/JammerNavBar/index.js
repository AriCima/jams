// COOL STYLE https://codepen.io/egoens/pen/NxejgJ

import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import Calculations from '../../services/Calculations';
import { setSection, setSubSection } from     "../../../redux/actions/navigateActions";
import { setDocType, setDocId, setEditable } from '../../../redux/actions/docsActions';
import './index.scss';


const JammerNavBar = ({ setJamSection, jamName, jamType}) => {
    
    const [jamSections, setJamSections] = useState([])
   
    const onsetJamSection = (section)=> {
        setJamSection(section)
    };

    useEffect(() => {
        const sections = Calculations.getJamJammerSections(jamType)
        setJamSections(sections)
    }, [jamType, setJamSections])


    const renderJammerNavBar = () => {
        return jamSections.map((section, id) => {
            
            const fontIcon = Calculations.getHeaderIcon(section);

            return jamType === 'chat' ? 
            
            <div className="jamJammerNavBar-item" key={id} onClick={() => onsetJamSection(`${section}`)}>
                    <FontAwesomeIcon className="navBar-icon-style" icon={faComments} />
            </div>
            
            : 

            <div className="jamJammerNavBar-item" key={id} onClick={() => onsetJamSection(`${section}`)}>
                {fontIcon}
            </div>
            
        })
    };

    return ( 
        <div className="jamJammer-NavBar">
            {jamSections === undefined ? <p>NO JAM SELECTED</p> : 
                <Fragment>
                {jamType !== 'chat' ? 
                    (
                        <Fragment>
                            <div className="jamJammerNavBar-left">
                                <div className="jamJammerNavBar-jamName">
                                    <p>No ADMIN {jamName}</p>
                                </div>
                            </div>
                            <div className="jamJammerNavBar-right">
                                {renderJammerNavBar()}
                            </div>
                        </Fragment>
                    ) : (
                        <div className="jamJammer-NavBar-chat">
                            {renderJammerNavBar()}
                        </div>
                    )
                }
                </Fragment>
            }
        </div>
    );

};


const mapStateToProps = (state) => {
    const { section, subSection } = state.nav;
    return {
        section,
        subSection
    }
};

export default connect(mapStateToProps, { setSection, setSubSection, setDocType, setDocId, setEditable })(JammerNavBar);
