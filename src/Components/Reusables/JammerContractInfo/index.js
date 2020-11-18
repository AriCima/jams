import React from 'react';
import moment from 'moment';

import PersonalInfoBlock from '../../UI/PersonalInfoBlock';

// CSS
// import './index.scss';

const JammerContractInfo = ({ contractInfo}) => {

    const { checkIn, checkOut, roomNr, rent, deposit } = contractInfo;
    
    return(

        <div className="jammer-info-section">
            <div className="jammer-info-section-title">
                <div className="backLine"/>
                <dic className="title">
                    <p>CONTRACT INFO</p>
                </dic>
            </div>
            <div className="jammer-info-section-contractInfo">
            <PersonalInfoBlock
                info={'Check-In'}
                data={moment(checkIn).format('DD-MMM-YYYY')}
                backColor={'secondary'}

            />
            <PersonalInfoBlock
                info={'Check-Out'}
                data={moment(checkOut).format('DD-MMM-YYYY')}
                backColor={'checkOut'}
            />
            <PersonalInfoBlock
                info={'Room Nr'}
                data={roomNr}
                backColor={'secondary'}
            />
            <PersonalInfoBlock
                info={'Rent'}
                data={rent}
                backColor={'secondary'}
            />
            <PersonalInfoBlock
                info={'Deposit'}
                data={deposit}
                backColor={'secondary'}
            />
            </div>
        </div>
    )
}

  
export default JammerContractInfo;
