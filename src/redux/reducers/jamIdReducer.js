const jamIdReducer = (state = null, action) => {
    switch(action.type) {
        case 'JAM_ID':
            return action.payload;
        default:
            return state
    }
};

export default jamIdReducer;