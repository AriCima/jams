
export const getRoomBookings = (jamId, roomId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        
        const firestore = getFirestore();
        return new Promise((resolve, reject) => {
            firestore.collection('jams').doc(jamId)
            .collection('rooms')
            .doc(roomId)
            .collection('bookings')
            .orderBy('checkIn', 'asc')
            .get()
            .then(result => {
                // console.log('result = ', result)
                const roomBookings = result;
                console.log.og(roomBookings)
                resolve(roomBookings);
                dispatch({
                    type: "GET_BOOKINGS", 
                    payload: roomBookings
                });
            })
        })
        .catch((err) => {
            dispatch({ type: 'GET_BOOKINGS_ERROR', err })
        })

    }
}
