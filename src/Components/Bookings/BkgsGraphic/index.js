import React from 'react';

// CSS
import './index.css';

const BookingsGraphic = ({ bookingsSummary }) => {
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


        return oneYearArray.map((months, i) => (
            <div className="graphic-container">

                <div className="month-container" key={i}>

                    <div className="month-name">
                        <p>{months[0]}</p>
                    </div>
                    <div className="days-container">
                        {generateDays(months[0], months[1])}
                    </div>

                </div>

            </div>
        ));
    };

    const generateDays = (mm, yy) => { // x = 'Mes' y = yyyy
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
            oneDay.background = 'rgba(124,252,0,0.6)';
            oneDay.width = `${100 / nrDays}px`;

            const dateToCompare = new Date(`${d + 1}-${mm}-${yy}`);

            // VERIFY: is oneDay between any check-in and check-out date ?
            for (let r = 0; r < bookingsSummary.length; r++) {
                const checkin = new Date(bookingsSummary[r].checkIn);
                const checkout = new Date(bookingsSummary[r].checkOut);


                if (dateToCompare >= checkin && dateToCompare <= checkout) { // styling BOOKED days
                    oneDay.background = 'red';
                }
            }
            // STYLING "TODAY"
            const hoy = {};
            hoy.day = today.getDate();
            hoy.month = months[Number(today.getMonth())];
            hoy.year = today.getFullYear();

            if (oneDay.day === hoy.day && oneDay.month === hoy.month && oneDay.year === hoy.year) {
                oneDay.background = 'rgb(255,255,0)';
            }

            oneMonthArray.push(oneDay);
        }


        return oneMonthArray.map((days, i) => (
            <div className="days-container">

                <div
                    className="single-day"
                    key={i}
                    style={{ background: days.background, width: days.width }}
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

export default BookingsGraphic;
