export const registerAction = (newUser) => {
    
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            // //console.log('new user id', resp.user.uid);
            return firestore.collection('users').doc(resp.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                initials: newUser.firstName[0] + newUser.lastName[0]
            }).then(() => {
                dispatch({type: 'SIGNUP_SUCCESS'})
            })
        }).catch(err => {
            //console.log('error')
            dispatch({type: 'SIGNUP_ERROR', err})
        })

    }
}

// export const loginAction = (credentials) => {
//     return (dispatch, getState, {getFirebase, getFirestore}) => {
//         const firebase = getFirebase();
//         const firestore = getFirestore();

//         firebase.auth().signInWithEmailAndPassword(
//             credentials.email,
//             credentials.password
//         ).then((res) => {
//             console.log('login res = ', res, ' / ', res.user.uid)
//             firestore.collection('users')
//             .doc(res.user.uid).collection('userJams').get()
//             .then(function(querySnapshot) {
//                 const userJams = []
//                 querySnapshot.forEach(function(doc) {
//                     // doc.data() is never undefined for query doc snapshots
//                     userJams.push(doc.data())
//                     return userJams
//                 });
//                 // //console.log('doc received', userJams);
//                 console.log('userJams: ', userJams);
//                 dispatch({type: 'LOGIN_SUCCESS', userJams})
//             })
//             .catch(function(error) {
//                 //console.log("Error getting documents: ", error);
//             });

//             //console.log('res del login = ', res)
//             // dispatch({type: 'LOGIN_SUCCESS'})
//         }).catch((err) =>
//         dispatch({type: 'LOGIN_ERROR', err}) )
//     }
// }

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
        dispatch({type: 'SIGNOUT_SUCCESS'});
        });
    }
}
