
export const getUserJams = (userId) => {
  
    if(!userId){
        return console.log('no user id', userId);
    } else { 
        return (dispatch, getState, { getFirebase, getFirestore }) => {
            
            const firestore = getFirestore();

            return new Promise((resolve, reject) => {

                getFirestore().collection('users').doc(userId).collection('userJams').get()
                .then(result => {
                    let userJams = [];
                    result.docs.forEach(d => {
                      let j = d.data();
                      j.id = d.id;
                      userJams.push(j);
                    });
                    resolve(userJams);
                    dispatch({
                        type: "GET_USER_JAMS", 
                        payload: userJams
                    });
                })
            })
            .catch((err) => {
                dispatch({ type: 'GET_USER_JAMS_ERROR', err })
            })

        }
    }
}



