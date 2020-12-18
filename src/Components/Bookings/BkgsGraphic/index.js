import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import Calculations from '../../services/Calculations';

// CSS
import './index.scss';

const BookingsGraphic = ({ jammers, subSection, nrOfRooms }) => {

    const editedJammers = Calculations.removeAmdinFromJammers(jammers);
    const tenantsByRooms = Calculations.getTenantsByRooms(editedJammers, nrOfRooms);

    let allTenants = [];

    if (subSection < tenantsByRooms.length ) {
        allTenants = tenantsByRooms[subSection]
    };

    const generateGraphicsMonths = () => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const today = new Date();
        const yyyy = Number(today.getFullYear());
        const cM = Number(today.getMonth()); // Current Month in numbers

        const oneYearArray = [];

        for (let s = cM; s <= 11; s++) {
            oneYearArray.push([months[s], yyyy]);
        }

        for (let s = 0; s < cM; s++) {
            oneYearArray.push([months[s], yyyy + 1]);
        }


        return oneYearArray.map((months, i) => {

            const isCurrent = i === 0; 
            return(
                <div className={`month-container ${isCurrent ? 'currentMonth' : ''}`} key={i}>
                    <div className="month-name">
                        <p>{months[0]}</p>
                    </div>
                    <div className="days-container">
                        {generateDays(months[0], months[1])}
                    </div>
    
                </div>
            )

        });
    };


    const generateDays = (mm, yy) => { // x = 'Mes' y = yyyy
        if(allTenants.length === 0) return;

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const oneMonthArray = [];
        const today = new Date();

        const nrDays = daysOfMonth[months.indexOf(mm)];

        for (let d = 0; d < nrDays; d++) {
            // BRING DATE TO (dd-Mm-yyyy) format
            const oneDay = {};
            oneDay.day = d + 1;
            oneDay.month = mm;
            oneDay.year = yy;
            // default days style
            oneDay.dayType = 'vacant';
            oneDay.width = `${100 / nrDays}px`;
            oneDay.isToday = '';

            const dateToCompare = new Date(`${d + 1}-${mm}-${yy}`);

            // VERIFY: is oneDay between any check-in and check-out date ?
            for (let r = 0; r < allTenants.length; r++) {
                const checkin = new Date(allTenants[r].checkIn);
                const checkout = new Date(allTenants[r].checkOut);


                if (dateToCompare >= checkin && dateToCompare <= checkout) { // styling BOOKED days
                    oneDay.dayType = 'booked'
                }
            }

            const dayFormat = moment(dateToCompare).format('DD');

            if (dayFormat === '01') oneDay.firstDay = 'isFirstDay';
            
            // STYLING "TODAY"
            const hoy = {};
            hoy.day = today.getDate();
            hoy.month = months[Number(today.getMonth())];
            hoy.year = today.getFullYear();

            if (oneDay.day === hoy.day && oneDay.month === hoy.month && oneDay.year === hoy.year) {
                oneDay.background = 'rgb(255,255,0)';
                oneDay.isToday = 'today'
            }

            oneMonthArray.push(oneDay);
        }



        return oneMonthArray.map((days, i) => (
            <div className="days-container">
                <div
                    className={`single-day ${days.dayType} ${days.firstDay} ${days.isToday}`}
                    key={i}
                    style={{width: days.width }}
                />

            </div>
        ));
    };

    return (
        <div className="graphic-area">
            {generateGraphicsMonths()}
        </div>
    );
};


const mapStateToProps = (state) => {

    const { subSection } = state.nav;
    const { jammers } = state.jamInfo;
    const { nrOfRooms } = state.jamInfo.jamDetails;

    return { jammers, subSection, nrOfRooms }
    
};
export default connect(mapStateToProps, null)(BookingsGraphic);

