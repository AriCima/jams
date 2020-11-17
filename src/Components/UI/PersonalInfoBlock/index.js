import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPassport, faAt, faPhone, faMobile, faMapMarkerAlt, faLocationArrow, faGlobeAmericas  } from '@fortawesome/free-solid-svg-icons'

// CSS
import './index.scss';

const PersonalInfoBlock = ({info, data}) => {
  
    let icon;
    switch (info) {
        case 'Email':
            icon = faAt
        break;
        case 'Passport':
            icon = faPassport
        break;
        case 'Phone':
            icon = faPhone
        break;
        case 'Mobile':
            icon = faMobile
        break;
        case 'Address':
            icon = faMapMarkerAlt
        break;
        case 'City':
            icon = faLocationArrow
        break;
        case 'Country':
            icon = faGlobeAmericas
        break;
        default:
            icon = ''
    };

    return(
        <div className="jammer-info-block">
            <div className="info-block-icon">
                <FontAwesomeIcon
                    className="info-icon"
                    icon={icon}
                />
            </div>
            <div className="info-block-data">
                <div className="info-line">
                    <p>{info}</p>
                </div>
                <div className="info-line">
                    {info === 'Email' ? <a href={`mailto: ${data}`}>{data}</a> : <p>{data}</p>}
                </div>

            </div>
        </div>

    )
}
  
export default PersonalInfoBlock;
