const alertsReducer = (state = [], action) => {
    switch (action.type) {
    case 'ALERT':
        return action.payload;
    default:
        return state;
    }
};
export default alertsReducer;
