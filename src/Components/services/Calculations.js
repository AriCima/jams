import React from 'react';

import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import orderBy from 'lodash/orderBy';
import forEach from 'lodash/forEach';
import findIndex from 'lodash/findIndex';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faChalkboard,
    faComments,
    faUsers,
    faUserLock,
    faCog,
    faPassport,
    faAt,
    faPhone,
    faMobile,
    faMapMarkerAlt,
    faLocationArrow,
    faGlobeAmericas,
    faDoorOpen,
    faBed,
    faWalking,
    faShieldAlt,
    faEuroSign
} from '@fortawesome/free-solid-svg-icons'

export default class Calculations {

    static getMessageDate(timestamp){
        const currentDate = moment(new Date()).format('DD/MM/YYYY');
        const messageDate =  moment(timestamp.toDate()).format('DD/MM/YYYY');
        let messageTime = '';
        
        if( messageDate === currentDate ){
            messageTime = 'today at ' + moment(timestamp.toDate()).format('h:mm');
        } else {
            messageTime = moment(timestamp.toDate()).format('DD/MM');
        }
        return messageTime
    }
    
    static generateCode(){ 
     // GENERATE CONTRACT CODE  type: 4aG-89n --> 14.776.336 combinations

     const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
     let codeArray = [];

     // if a random nr is even then letter is capital
     for (let l=0; l<8; l++){
        const firstRandomNr = Math.round(Math.random()*10);
        const secondRandomNr = Math.round(Math.random()*10);

        const isNumber = Number.isInteger(firstRandomNr/2);
        const isCapitalLetter =  Number.isInteger(secondRandomNr/2);
        const letterIndex = Math.round(Math.random()*25);

        if (isNumber) {
            codeArray[l]=(firstRandomNr);
        } else if (isCapitalLetter){
                codeArray[l]=(letters[letterIndex]).toUpperCase();
            } else {
                codeArray[l]=letters[letterIndex];
        }
     };

     codeArray[3] = '-'
     let code = codeArray.join("");
     return code
    };

    static getJamAdminSections(type){
        //console.log('get Jam Sections launched')
        let sections = [];
        switch (type) {
            case 'accommodation':
              sections = ['Board', 'Jammers', 'MyJam', 'Settings']
              break;
            case 'rooms-rental':
                sections = ['Overview','Board', 'Tenants', 'Rooms', 'Settings']
                break;
            case 'chat': 
                sections = ['Chat']
                break;
            default:
              //console.log('no reconoce tipo')
        }
       return sections;
    };

    static getJamGuestSections(type){
        //console.log('get Jam Sections launched')
        let sections = [];
        switch (type) {
            case 'accommodation':
              sections = ['Board', 'Jammers', 'MyJam', 'Settings']
              break;
            case 'rooms-rental':
                sections = ['Overview', 'Board', 'Flatmates']
                break;
            case 'chat': 
                sections = ['Chat']
                break;
            default:
              //console.log('no reconoce tipo')
        }
       return sections;
    };

    static getIcon(info){

        let icon; 
        switch (info) {
            case 'Email':
                icon = faAt;
            break;
            case 'Passport':
                icon = faPassport;
            break;
            case 'Phone':
                icon = faPhone;
            break;
            case 'Mobile':
                icon = faMobile;
            break;
            case 'Address':
                icon = faMapMarkerAlt;
            break;
            case 'City':
                icon = faLocationArrow;
            break;
            case 'Country':
                icon = faGlobeAmericas;
            break;
            case 'Check-In':
                icon = faWalking;
            break;
            case 'Check-Out':
                icon = faWalking;
            break;
            case 'Room Nr':
                icon = faBed;
            break;
            case 'Rent':
                icon = faEuroSign;
            break;
            case 'Deposit':
                icon = faShieldAlt;
            break;
            default:
                icon = '';
        };
        return icon;
    }

    static validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    static getJamRules(type){
        //console.log('get Jam Sections launched')
        let rules = [];
        switch (type) {
            case 'accommodation':
              rules = ['Board', 'Jammers', 'MyJam', 'Settings']
              break;
            case 'rooms-rental':
                rules = {
                    smokingBalcony: false,
                    pets: false,
                    smoking: false,
                    overnight: false,
                    checkInProcess: '',
                    checkOutProcess: '',
                    checkInFrom: '2pm',
                    checkInTo: '10pm',
                    checkOutBefore: '10am'
                }
                break;
            case 'chat': 
                rules = ['Chat']
                break;
            default:
              //console.log('no reconoce tipo')
        }
       return rules;
    };

    // - - - - - SORTING FUNCTIONS 

    // https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
    static sortByDateAsc(x){
        //console.log('info received :', x);
        function compare(a,b){
            const varA = new Date(a.createdAt.seconds);
            const varB = new Date(b.createdAt.seconds);
        
            let comparison = 0;
            if (varA < varB) {
            comparison = -1;
            } else if (varA > varB) {
            comparison = 1;
            }
            return comparison;
        }

        return x.sort(compare)
    };

    static sortByDateDesc(x){

        function compare(a,b){
            const varA = new Date(a.createdAt.seconds);
            const varB = new Date(b.createdAt.seconds);
        
            let comparison = 0;
            if (varA > varB) {
            comparison = -1;
            } else if (varA < varB) {
            comparison = 1;
            }
            return comparison;
        }

        return x.sort(compare)
    };

    static sortAsc(x){
        function compare(a,b){
            const varA = a[0];
            const varB = a[1];
        
            let comparison = 0;
            if (varA < varB) {
            comparison = -1;
            } else if (varA > varB) {
            comparison = 1;
            }
            return comparison;
        }

        return x.sort(compare)
    };

    static sortAscRooms(x){
        function compare(a,b){
            const varA = a.roomNr;
            const varB = b.roomNr;            
        
            let comparison = 0;
            if (varA < varB) {
            comparison = -1;
            } else if (varA > varB) {
            comparison = 1;
            }
            return comparison;
        }

        return x.sort(compare)
    };


    // HEADER ICONS

    static getHeaderIcon = (section) => {
        let icon = ''
        switch (section){
            case 'board':
                icon = <p><FontAwesomeIcon className="navBar-icon-style" icon={faChalkboard} /></p>  
                break;
            case 'jammers':
                icon = <p><FontAwesomeIcon className="navBar-icon-style" icon={faUsers} /></p>  
                    break;
            case 'settings':
                icon = <p><FontAwesomeIcon className="navBar-icon-style" icon={faCog} /></p>  
                    break;
            case 'myJam':
                icon = <p><FontAwesomeIcon className="navBar-icon-style" icon={faUserLock} /></p>  
                    break;
            case 'chat':
                icon = <p><FontAwesomeIcon className="navBar-icon-style" icon={faComments} /></p>  
                break;
            default:
                //console.log('no navbar item matched')
        };

        return icon
    };

    // - - - - - - - CONTRATO - - - - - - - - 

    static getApartmentDivisions = (totalRooms, leng) => {
        let divisions = {eng: '', esp:''}
        switch (totalRooms){
            case '2':
                divisions = {eng: 'one half part (1/2)', esp: 'una media parte (1/2'};
                break;
            case '3':
                    divisions = {eng: 'one third part (1/3)', esp: 'una tercera parte (1/3'};
                    break;
            case '4':
                    divisions = {eng: 'one fourth part (1/4)', esp: 'una cuarta parte (1/4'};
                    break;
            case '5':
                    divisions = {eng: 'one fifth part (1/5)', esp: 'una quinta parte (1/5'};
                    break;
            case '6':
                    divisions = {eng: 'one sixth part (1/6)', esp: 'una sexta parte (1/6'};
                    break;
            case '7':
                    divisions = {eng: 'one seventh part (1/7)', esp: 'una séptima parte (1/7'};
                    break;
            case '8':
                    divisions = {eng: 'one eigth part (1/8)', esp: 'una octava parte (1/8)'};
                    break;
            case '9':
                    divisions = {eng: 'one nineth part (1/9)', esp: 'una novena parte (1/9)'};
                    break;
            case '10':
                    divisions = {eng: 'one tenth part (1/10)', esp: 'una decima parte (1/10)'};
                    break;
            default:
                //console.log('el apartamento tiene más de 10 habitaciones')
        };

        if (leng == 'ES') {
            return divisions.esp
        } else {
            return divisions.eng
        }
    };

    // - - - - - - - - BOOKINGS - - - - - - - - 

    static organizeBookings = (bookings) => {
        const result = {
            currentBooking: {}, 
            dueBookings: [],
            futureBookings: [],
        };
        
        const currentDate = new Date();

        bookings.forEach(e => {
            const cOut = new Date(e.checkOut);
            const cIn = new Date(e.checkIn);
            if ( currentDate > cOut ) {
                result.dueBookings.push(e)
            } else if ( currentDate < cIn) {
                result.futureBookings.push(e);
            } else if ( (currentDate >= cIn) && (currentDate <= cOut) ) {
                result.currentBooking = {...e}
            }
        });
        if (result.futureBookings.length !== 0) {
            result.nextBooking = result.futureBookings[0];
        } else {
            result.nextBooking = {};
        }
        // console.log('result = ', result)
        return result
    }

    // - - - - - - - - JAMMERS - - - - - - - - 

    static removeAmdinFromJammers = (tenants) => {
        const noAdmin = tenants.filter(function( obj ) { 
            return obj.checkIn !== undefined;
        })

        return noAdmin
    };

    static getCurrentTenants = (tenants) => {

        const today = moment(new Date()).format("YYYY-MM");

        let currentTenants = [];
        for (let i = 0; i < tenants.length; i++) {

            const inDay = tenants[i].checkIn;
            let inDate; //día del mes 
            if(inDay) {
                inDate = parseInt(inDay.substring(8));
            }
            const inMonth = moment(inDay).month();
            const todayIsAfterIn = moment(today).isSameOrAfter(inDay);
            const outDay = tenants[i].checkOut;
            let outDate;
            if(outDay) {
                outDate = parseInt(outDay.substring(8));
            }
            const outMonth = moment(outDay).month();
            const todayisBeforeOut = moment(today).isSameOrBefore(outDay);

            const isCurrent = todayIsAfterIn && todayisBeforeOut;

            if(isCurrent) currentTenants.push(tenants[i]);
        }

        return currentTenants;
    };

    static getTenantsByRooms = (tenants, nrOfRooms) => { // separa los tenants por habitaciones
        let tenantsByRooms = {};

        for (let i = 1; i <= nrOfRooms; i++) {
            const roomNr = i.toString();
            const tenantsInOneRoom = tenants.filter(e => e.roomNr === roomNr );
            tenantsByRooms[`${roomNr}`] = tenantsInOneRoom;

        };
        // FORNAT --> tenantsByRooms = {1:[{..}, {..}], 2:[{..} . . . {..}],  . . }
        return tenantsByRooms
    };

    static getOrganizedTenants = (tenantsByRooms, nrOfRooms) => { // Organiza los inquilinos de cada room
    
        const result = [];
        const today = new Date();

        for (let i = 1; i <= nrOfRooms; i++) {
            const tenants = tenantsByRooms[i];
            const tL = tenants.length;

            let organizedTenants = {
                currentTenant: [],
                // nextTenant: {},
                formerTenants: [],
                futureTenants: [],
            };

            for (let j = 0; j < tL; j++) {

                const tenant = tenants[j];

                const cOut = new Date(tenant.checkOut);
                const cIn = new Date (tenant.checkIn)
    
                if (cIn < today && cOut > today) {
                    organizedTenants.currentTenant.push(tenant);
                } else if ( cIn < today && cOut < today) {
                    organizedTenants.formerTenants.push(tenant);
                } else if (cIn > today) {
                    organizedTenants.futureTenants.push(tenant);
                }

            };

            result.push(organizedTenants);
        }
        // FORNAT --> tenantsByRooms = {1:[{..}, {..}], 2:[{..} . . . {..}],  . . }
        return result
    };

    static sortByCheckInAsc(x){
        function compare(a,b){
            const varA = new Date(a.checkIn);
            const varB = new Date(b.checkIn);
        
            let comparison = 0;
            if (varA < varB) {
            comparison = -1;
            } else if (varA > varB) {
            comparison = 1;
            }
            return comparison;
        }

        return x.sort(compare)
    };

    static sortByRoomNr(x){
        function compare(a,b){
            const varA = new Date(a.roomNr);
            const varB = new Date(b.roomNr);
        
            let comparison = 0;
            if (varA < varB) {
            comparison = -1;
            } else if (varA > varB) {
            comparison = 1;
            }
            return comparison;
        }

        return x.sort(compare)
    };

    static sortByChecOutDesc(x){
        //console.log('info received :', x);
        function compare(a,b){
            const varA = new Date(a.checkOut);
            const varB = new Date(b.checkOut);
        
            let comparison = 0;
            if (varA > varB) {
            comparison = -1;
            } else if (varA < varB) {
            comparison = 1;
            }
            return comparison;
        }

        return x.sort(compare)
    };

    static getAllTenantsOrganized = (jammers) => { // Organiza los inquilinos en current, former y future
        const result = {
            currentTenants: [],
            formerTenants: [],
            futureTenants: [],
        };
        const today = new Date();
        const jL = jammers.length;

        for (let j = 0; j < jL; j++) {

            const tenant = jammers[j];

            const cOut = new Date(tenant.checkOut);
            const cIn = new Date (tenant.checkIn)

            if (cIn < today && cOut > today) {
                result.currentTenants.push(tenant);
            } else if ( cIn < today && cOut < today) {
                result.formerTenants.push(tenant);
            } else if (cIn > today) {
                result.futureTenants.push(tenant);
            }
        }
        return result  // Array length = nro habs 
    };
    
    static getTenantPayments = (rent, cMode, cIn, cOut) => {

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const chIn = cIn;
        const inYY = Number(chIn.getFullYear());
        const inM = Number(chIn.getMonth()); // CheckIn Month in numbers
        const inDays = moment(cIn).date();

        const chOut =cOut;
        const outYY = Number(chOut.getFullYear());
        const outM = Number(chOut.getMonth()); // CheckOut Month in numbers
        const outDays = moment(cOut).date();

        let inRent = parseInt(rent);
        let outRent = parseInt(rent);

        switch (cMode) {
            case 'daily':
                inRent = (parseInt(rent)/30) * (30 - inDays);
                outRent = (parseInt(rent)/30) * outDays
            break;
            case 'fortnightly':
                if (inDays > 15) {
                    inRent = parseInt(rent)/2
                }
                if (outDays <= 15) {
                    outRent = parseInt(rent)/2
                }
                
        }

        let rentsArray = [{month: months[inM], rent: inRent, paidRent: 0, difOK: false}];

        if (inYY === outYY) {
            for (let s = inM+1; s < outM; s++) {
                const pay = {month: months[s], rent: parseInt(rent), paidRent: 0, difOK: false}
                rentsArray.push(pay);
            }
        } else {
            for (let s = inM; s <= 11; s++) {
                const pay = {month: months[s], rent: parseInt(rent), paidRent: 0, difOK: false}
                rentsArray.push(pay);
            }
    
            for (let s = 0; s < outM; s++) {
                const pay = {month: months[s], rent: parseInt(rent), paidRent: 0, difOK: false}
                rentsArray.push(pay);
            }
        }

        rentsArray.push({month: months[outM], rent: outRent, paidRent: 0, difOK: false});

        return rentsArray;
    };

    // - - - - - - - - STATISTICS - - - - - - - - 
    
    static getCurrentAndFutureTenants = (tenants) => {
        const today = moment(new Date())
        let newArray = [];
        for(let i = 0; i < tenants.length; i++) {
            const outDate = moment(new Date(tenants[i].checkOut))
            const isCurrentOrFuture = moment(today).isSameOrBefore(outDate);

            if(isCurrentOrFuture) {
                newArray.push(tenants[i])
            }
        }
        return newArray;
    };

    static getCurrentOccupancy = (tenants, rooms) => {
        
        const currentTenants = this.getCurrentTenants(tenants)
        
        const today = moment(new Date()).format("YYYY-MM");
        const currentMonth = moment(today).month()
        const days = moment(today, "YYYY-MM").daysInMonth();
        const totalOfDays = days * parseInt(rooms);

        const numberOfRooms = parseInt(rooms);
        let occupancyPerRoom = [];
        for (let j=0; j<numberOfRooms; j++) {
            occupancyPerRoom[j] = 0;
        };

        for (let i = 0; i < currentTenants.length; i++){
            const roomNr = tenants[i].roomNr;
            const inDay = tenants[i].checkIn;
            let inDate; //día del mes 
            if(inDay) {
                inDate = parseInt(inDay.substring(8));
            }
            const inMonth = moment(inDay).month();
            const outDay = tenants[i].checkOut;
            let outDate;
            if(outDay) {
                outDate = parseInt(outDay.substring(8));
            }
            const outMonth = moment(outDay).month();

            if(inMonth !== currentMonth && outMonth !== currentMonth) {
                occupancyPerRoom[roomNr-1] =  occupancyPerRoom[roomNr-1] + days;
            } else if (inMonth === currentMonth && outMonth === currentMonth) {
                const totalDays = outDate - inDate;
                occupancyPerRoom[roomNr-1] =  occupancyPerRoom[roomNr-1] + totalDays;
            } else if (inMonth === currentMonth && outMonth !== currentMonth) {
                occupancyPerRoom[roomNr-1] = days - inDate;
            } else if (inMonth !== currentMonth && outMonth === currentMonth){
                occupancyPerRoom[roomNr-1] = outDate;
            }
        }
        
        
        let count = 0;
        for (let r = 0; r < numberOfRooms; r++){
            count = count + occupancyPerRoom[r]
        };

        const result = (count / totalOfDays) * 100;

        return result;
    };

    static getCurrentIncomes = (tenants) => {
        const currentTenants = this.getCurrentTenants(tenants)
        
        let incomes = 0;
        for (let r = 0; r < currentTenants.length; r++){
            const cT = currentTenants[r];
            incomes = incomes + parseInt(currentTenants[r].rent);
        };

        const result = incomes;

        return result;
    };

    static getFutureChecks(tenants){
        const today = moment(new Date())
        const currentAndFutureTenants = this.getCurrentAndFutureTenants(tenants);
        const arrLength = currentAndFutureTenants.length;

        const testArr = [];

        for (let i = 0; i < arrLength; i++) {

            const { checkIn, userId, firstName, lastName } = currentAndFutureTenants[i];
            const { checkOut } = currentAndFutureTenants[i];
            
            const alreadyIn = moment(checkIn).isSameOrBefore(today)
            
            const outs = {date: checkOut, userId, firstName, lastName, type: 'chkOut'};
            
            if(!alreadyIn) {
                const ins = {date: checkIn, firstName, lastName, userId, type: 'chkIn'};
                testArr.push(ins)
            };

            testArr.push(outs)
        }

        const res = orderBy(testArr,['date'], ['asc']);

        return  res
    };

    static getRoomsOccupancy = (tenants, rooms) => {
        let roomsOccupancy = [];
        const numberOfRooms = parseInt(rooms);

        for (let i = 1; i <= numberOfRooms; i++) {
           
            const roomNr = i;
            let tenantsInRoom = [];
            for (let j = 0; j < tenants.length; j++){
                const tenantsRoom = parseInt(tenants[j].roomNr);
                if (tenantsRoom === roomNr) {
                    tenantsInRoom.push(tenants[j]);
                }
            }
            const orderedTenants = this.organizeAdminTenants(tenantsInRoom);

            roomsOccupancy.push(orderedTenants);
        }

        return roomsOccupancy
    };

    static getAllTenantsInOneRoom = (tenants) => {

        let allTenants = [tenants.currentTenant];

        const forT = tenants.formerTenants;
        const futT = tenants.futureTenants
        const forL = forT.length;
        const futL = futT.length;

        if (forL > 0) {
            for (let i = 0; i < forL; i++) {
                allTenants.push(forT[i])
            }
        }

        if (futL > 0) {
            for (let i = 0; i < futL; i++) {
                allTenants.push(futT[i])
            }
        }

        return allTenants
    };

    // * * * * * ** * * ** *  to visualize tenants
    static organizeAdminTenants = (tenants) => {
        let result = {
            currentTenants: [],
            formerTenants: [],
            futureTenants: [],
        };
        
        const currentDate = new Date();

        tenants.forEach(e => {
            const cOut = new Date(e.checkOut);
            const cIn = new Date(e.checkIn);
            if ( currentDate > cOut ) {
                result.formerTenants.push(e)
            } else if ( currentDate < cIn) {
                result.futureTenants.push(e);
            } else if ( (currentDate >= cIn) && (currentDate <= cOut) ) {
                result.currentTenants.push(e);
            }
        });

        return result
    };

    static fitlerTenantsByRoomNr = (tenants, roomNr) => {
        const roomString = (roomNr+1).toString()

        for (let elem in tenants) {
            const filteredTenants = tenants[elem].filter(i => i.roomNr === roomString);
            tenants[elem] = filteredTenants;
        }
        return tenants;
    }

    static organizeFlatmates = (tenants, userId) => {

        let flatMates = [];
        const userIndex = tenants.map(function(e) { return e.userId }).indexOf(userId);

        const userCheckInDate = new Date (tenants[userIndex].checkIn);
        const userCheckOutDate = new Date (tenants[userIndex].checkOut);

        tenants.forEach(e => {
            const cIn = new Date(e.checkIn);
            const cOut = new Date(e.checkOut);
            if ((cIn >= userCheckInDate && cIn <= userCheckOutDate) || (cOut >= userCheckInDate && cOut <= userCheckOutDate)) {
                flatMates.push(e)
            };
        });
        return flatMates
    };

    static checkOverlapping(checkIn, checkOut, jammers){
        
        for (let k=0; k < jammers.length; k++){
            const bIn = new Date (jammers[k].checkIn);
            const bOut = new Date (jammers[k].checkOut);
            const uId = jammers[k].userId;
            const bName = jammers[k].firstName + jammers[k].lastName;

            if(checkOut >= bIn && checkOut <= bOut){
                let validationResult = {
                    error : true,
                    message : `The range overlaps with ${bName}`,
                    userId: uId
                }
                return validationResult 
            };
            if(checkIn >= bIn && checkIn <= bOut){
                let validationResult = {
                    error : true,
                    message : `The range overlaps with ${bName}`,
                    userId: uId
                }
                return validationResult 
            };
        }
        
        let validationResult = {
            error : false,
            message : "Dates are OK"
        }

        return validationResult
       
    };
    
    // - - - - - - - - ROOMS  - - - - - - - - - - - 

    static getCompleteRoomsInfo = (roomsInfo) => {
        const rsL = roomsInfo.length
        const roomsBookings = [];

        for (let i = 0; i < rsL; i++) {
            if (!isEmpty(roomsInfo[i].bookingsSummary)) {
                const jamOrderedBookings = Calculations.organizeBookings(roomsInfo[i].bookingsSummary);
                const { roomNr, roomRent, roomDeposit, roomSize, exterior, double } = roomsInfo[i];
                const roomId = roomsInfo[i].id;
                const roomBookingsSummary = { roomNr, roomRent, roomDeposit, roomSize, exterior, double, roomId, bookings: jamOrderedBookings };
                roomsBookings.push(roomBookingsSummary);
            };
        };
        const orderedRooms = Calculations.sortAscRooms(roomsBookings)
        return orderedRooms;
    }

    static missingRoomsInfo = (roomsInfo) => {
        const rL = roomsInfo.length
        let missingInfo = false;
        let missingArr = [];

        for (let i = 0; i < rL; i++) {
            const room = roomsInfo[i];
            let missingObj = {roomNr: room.roomNr};
            let pushObj = false;
            forEach(room, function(value, key) {
                if(value === '') {
                    missingInfo = true;
                    pushObj = true;
                    missingObj[key]=value;
                }
            })
            if(pushObj) {
                missingArr.push(missingObj)
            }
        };
        const result = {missingInfo, missingArr}
        return result;
    }

}