import React  from 'react';

import './index.scss'

const LabelValueChart = ({ info }) => {
    console.log('info: ', info);

    const renderInfo = () => {

        return info.map((info, i) => {
                console.log('i: ', i, ' / ', info.label);
    
                return(
                    <tr>
                        <td id="label-column">{info.label}</td>
                        <td id="value-column">{info.value}</td>
                    </tr>
                )
            
        })
    }

    return (
        <table id="label-value-chart">
            {renderInfo()}
        </table>
    )
};

export default LabelValueChart;
