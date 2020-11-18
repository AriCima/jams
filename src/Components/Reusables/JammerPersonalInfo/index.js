import React  from 'react';

import PersonalInfoBlock from '../../UI/PersonalInfoBlock';

// CSS
import './index.scss';

const JammerContractInfo = ({ personalInfo }) => {

    const { 
        city,
        country,
        door, 
        email, 
        firstName, 
        floor,
        houseNr,
        lastName, 
        mobile,
        passportNr, 
        street, 
        homeTel, 
        zipCode, 
    } = personalInfo

    const complAdd = {address: street+' '+houseNr+', '+`${floor !== '' && (floor+' floor')}`+`${door !== '' && (', door '+door) }`, 
        city: zipCode+' - '+city,
        country: country
}   ;
  return(
    
    <div className="jammer-info-section">
        <div className="jammer-info-section-title">
            <p>Personal Info</p>
        </div>
        <div className="jammer-info-section-personalInfo">
            <PersonalInfoBlock
                info={'Email'}
                data={email}
                backColor={'buttonPrimary'}
            />
            <PersonalInfoBlock
                info={'Phone'}
                data={homeTel}
                backColor={'buttonPrimary'}
            />
            <PersonalInfoBlock
                info={'Mobile'}
                data={mobile}
                backColor={'buttonPrimary'}
            />
            <PersonalInfoBlock
                info={'Passport'}
                data={passportNr}
                backColor={'buttonPrimary'}
            />
            <PersonalInfoBlock
                info={'Address'}
                data={complAdd.address}
                backColor={'buttonPrimary'}
            />
            <PersonalInfoBlock
                info={'City'}
                data={complAdd.city}
                backColor={'buttonPrimary'}
            />
            <PersonalInfoBlock
                info={'Country'}
                data={complAdd.country}
                backColor={'buttonPrimary'}
            />
        </div>
    </div>

  )
}


export default JammerContractInfo;
