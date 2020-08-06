const userJamsReducer = (state = [], action) => {
    switch(action.type) {
        case 'GET_USER_JAMS':
            return action.payload;

        default:
            return state
    }
};

export default userJamsReducer;