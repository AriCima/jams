
export const getJammerInfo = (jamId, jammerId) => {
    console.log('entró con', jamId, ' / ', jammerId)
        return (dispatch, getState, { getFirebase, getFirestore }) => {
            
            const firestore = getFirestore();
            console.log('promise', jamId, ' / ', jammerId)
            return new Promise((resolve, reject) => {
                firestore.collection('jams').doc(jamId)
                .collection('jammers')
                .doc(jammerId)
                .get()
                .then(result => {
                    console.log('result = ', result)
                    const jammerInfo = result;
                    console.log.og(jammerInfo)
                    resolve(jammerInfo);
                    dispatch({
                        type: "GET_JAMMER_INFO", 
                        payload: jammerInfo
                    });
                })
            })
            .catch((err) => {
                dispatch({ type: 'GET_JAMMER_INFO_ERROR', err })
            })

        }
    
}

export const setJammerId = (jammerId) => {
    console.log('SET JAMMER ID LAUNCHED', jammerId)
    return  {
        type: "JAMMER_ID", 
        payload: jammerId
    }
};



