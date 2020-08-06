const roomBookingsReducer = (state = {}, action) => {  
    // console.log('action en el reducer = ', action)  
    switch(action.type) {
        case 'ROOM_BOOKINGS':
            return action.payload;
        default:
            return state
    }
};

export default roomBookingsReducer;