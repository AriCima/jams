const roomIdReducer = (state = 'overview', action) => {  
    // console.log('action en el reducer = ', action)  
    switch(action.type) {
        case 'ROOM_ID':
            return action.payload;
        default:
            return state
    }
};

export default roomIdReducer;