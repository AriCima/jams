const jamSectionReducer = (state = [''], action) => {
    switch (action.type) {
    case 'JAM_SECTION':
        return action.payload;
    default:
        return state;
    }
};

export default jamSectionReducer;
