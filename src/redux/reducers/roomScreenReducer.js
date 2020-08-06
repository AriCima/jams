const roomIdReducer = (state = 'overview', action) => {  
    switch(action.type) {
        case 'ACTIVE_SCREEN':
            return action.payload;
        default:
            return state
    }
};

export default roomIdReducer;