import React from 'react';

import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import values from 'lodash/values';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChalkboard, faComments, faUsers, faUserLock, faCog} from '@fortawesome/free-solid-svg-icons'

export default class Calculations {

    static getCurrentMonth(){
        let months  =  ['Januay', 'February', 'March', 'April','May', 'June', 'July', 'August','September', 'October', 'November', 'December'];
        const date = new Date();
        let monthNr = date.getMonth()
        let currentMonth = months[monthNr]
       
        return currentMonth
    };

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
     // GENERATE BOOKING CODE  type: 4aG-89n --> 14.776.336 combinations

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
     console.log('code = ', code)
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

    static validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

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

    // - - - - - - - CONTRATO
    static getApartmentDivisions = (totalRooms) => {
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

        return divisions
    };

    // - - - - - - - - BOOKINGS

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
    }

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
    }

    static organizeFlatmates = (tenants, userId) => {

        let flatMates = [];
        const userIndex = tenants.map(function(e) { return e.userId }).indexOf(userId);

        const userCheckInDate = new Date (tenants[userIndex].checkIn);
        const userCheckOutDate = new Date (tenants[userIndex].checkOut);

        tenants.forEach(e => {
            const cIn = new Date(e.checkIn);
            const cOut = new Date(e.checkOut);
            if ((cIn > userCheckInDate && cIn < userCheckOutDate) || (cOut > userCheckInDate && cOut < userCheckOutDate)) {
                flatMates.push(e)
            };
        });
        return flatMates
    };




    static checkOverlapping(checkIn, checkOut, bookings){
        
        for (let k=0; k < bookings.length; k++){
            const bIn = new Date (bookings[k].checkIn);
            const bOut = new Date (bookings[k].checkOut);
            const bId = bookings[k].bookingId;
            const bName = bookings[k].jammerName;

            if(checkOut >= bIn && checkOut <= bOut){
                let validationResult = {
                    error : true,
                    message : `The range overlaps with ${bName}'s booking, booking-ID =${bId}`
                }
                return validationResult 
            };
            if(checkIn >= bIn && checkIn <= bOut){
                let validationResult = {
                    error : true,
                    message : `The range overlaps with ${bName}'s booking, booking-ID =${bId}`
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
    // FLAT INFO
    static getOnwStudentsFlats = (userJams = [], userId = '') => {
        let result = []
        for ( let i = 0; i < userJams.length; i++ ){
            if ( userJams[i].adminId === userId && userJams[i].jamType === 'studentsFlat') {
              result.push(userJams[i])
            }
        }
        return result
    }

    static mergeCompleteFlatInfo = (flats = [], rooms = []) => {
        for (let i = 0; i < flats.length; i++){
            flats[i].rooms=(rooms[i])
        };
        return flats
    }

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



}