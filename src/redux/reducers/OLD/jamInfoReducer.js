const jamInfoReducer = (state = [], action) => {
    // sintaxis deseable
    switch (action.type) {
        case 'GET_JAM_INFO':
            return action.payload;
        default: 
            return state;
    }
};

export default jamInfoReducer;