import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import IconsStore from '../../services/IconsStore';
// CSS
import './index.scss';

const PersonalInfoBlock = ({info, data, backColor}) => {
  
    const icon = IconsStore.getIcon(info);

    return(
        <div className="jammer-info-block">
            <div className={`info-block-icon ${backColor}`}>
                <FontAwesomeIcon
                    className="info-icon"
                    icon={icon}
                />
            </div>
            <div className="info-block-data">
                <div className="info-line">
                    <h4>{info}</h4>
                </div>
                <div className="info-line">
                    {info === 'Email' ? <a href={`mailto: ${data}`}>{data}</a> : <p>{data}</p>}
                </div>

            </div>
        </div>
    )
}
  
export default PersonalInfoBlock;
