const jammerIdReducer = (state = '', action) => {    
    switch(action.type) {
        case 'JAMMER_ID':
            return action.payload;
        default:
            return state
    }
};

export default jammerIdReducer;