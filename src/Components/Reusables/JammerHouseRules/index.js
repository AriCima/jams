import React, { useState, useEffect }  from 'react';
import { connect } from 'react-redux';

import isEmpty from 'lodash/isEmpty';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

import './index.scss';

const JammerHouseRules = ({ houseRules }) => {

    const [rules, setRules ] = useState({});

    const {
        checkInFrom = '',
        checkInProcess = '',
        checkInTo = '',
        checkOutBefore = '',
        checkOutProcess = '',
        overnight = false,
        parties = false,
        pets = false,
        smoking = false,
        smokingBalcony = false
    } = rules

    useEffect(() => {
        if (!isEmpty(houseRules)) {
            setRules(houseRules)
        }
    }, [houseRules])

    const renderIcon = (ok) => {    
        if (!ok) {
            return (
                <FontAwesomeIcon
                    className="ok-rule"
                    icon={faCheckCircle}
                />
            )
        } else {
            return(
                <FontAwesomeIcon
                    className="no-ok-rule"
                    icon={faBan}
                />
            )
        }
    }

  return(
    <div className="jammer-houseRules-section">
        
        <div className="jammer-houseRules-title">
            <div className="backLine"/>
            <div className="title">
                <p>HOUSE RULES</p>
            </div>
        </div>
        <table id="jammer-houseRules-table">
            <tr>
                <td className="table-label">
                    <p>Can I have pets in the apartment ?</p>
                </td>
                <td className="table-value">
                    {renderIcon(pets)}
                </td>
            </tr>
            <tr>
                <td className="table-label">
                    <p>Can I organize or participate in parties in the apartment ?</p>
                </td>
                <td className="table-value">
                    {renderIcon(parties)}
                </td>
            </tr>
            <tr>
                <td className="table-label">
                    <p>Can I invite friends to overnight ?</p>
                </td>
                <td className="table-value">
                    {renderIcon(overnight)}
                </td>
            </tr>
            <tr>
                <td className="table-label">
                    <p>Can I smoke in the partment ?</p>
                </td>
                <td className="table-value">
                    {renderIcon(smoking)}
                </td>
            </tr>
            <tr>
                <td className="table-label">
                    <p>Can I smoke in balconies or terraces ?</p>
                </td>
                <td className="table-value">
                    {renderIcon(smokingBalcony)}
                </td>
            </tr>
            <tr>
                <td className="table-label">
                    <p>Check-In time</p>
                </td>
                <td className="table-value">
                    <h4>from {checkInFrom} to {checkInTo} </h4>
                </td>
            </tr>

            <tr>
                <td className="table-label">
                    <p>Check-Out before</p>
                </td>
                <td className="table-value">
                    <h4>{checkOutBefore}</h4>
                </td>
            </tr>
        </table>

        <div className="rules-texts">
            <div className="rule-title">
                <p>Check-In procedure</p>
            </div>
            <div className="rule-description">
                {checkInProcess}
            </div>
            <div className="rule-title">
                <p>Check-Out procedure</p>
            </div>
            <div className="rule-description">
                {checkOutProcess}
            </div>
        </div>


    </div>
  )
}


const mapStateToProps = (state) => {
    
    const { houseRules  } = state.jamInfo.jamDetails;
    
    return { houseRules };
};
export default connect(mapStateToProps, null)(JammerHouseRules);

