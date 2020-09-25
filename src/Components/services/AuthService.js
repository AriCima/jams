import firebase from 'firebase';
import DataService from './DataService';

export default class AuthService {

    static login(email, password){

        return new Promise((resolve, reject) => {

            firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) =>{
                resolve(result);
                console.log('El result del LOGIN en Auth es: ', result)
            })

            .catch((error) => {
                var errorCode = error.code;
                console.log('AUTH SERVICE::::errorCode: ', errorCode);
                var errorMessage = error.message;
                console.log('errorMessage: ', errorMessage);
                
                if(errorCode === "auth/wrong-password"){
                    reject('User and or Password not valid');
                }
            });
            
        });
    };

    static register(firstName, lastName, email, password){
        return new Promise((resolve, reject) => {

            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                // console.log("REGISTER OK userId", result.user.uid);
                const userId = result.user.uid;
                const userInfo = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    userJams: []
                };
                DataService.saveUserInfoInFirestore(userId, userInfo)
                .then(res => {
                    // console.log('user in Firestore OK: ', result)
                    resolve(userId);  
                })
                console.log('RegisterResult OK: ', result)
            })
            .catch((error) => {
                var errorCode = error.code;
                console.log('AUTH SERVICE::::errorCode: ', errorCode);
                var errorMessage = error.message;
                reject(errorMessage)
            })
        });
    };

    static registerWithInvitation(firstName, lastName, email, password, jamId, jamInfo){
        return new Promise((resolve, reject) => {

            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                const userId = result.user.uid;
                const userInfo = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    userJams: [jamId]
                };
                DataService.saveUserInfoInFirestore(userId, userInfo);
                DataService.updateJammersInJam(jamId, userId, userInfo);
                DataService.updateUserJams(userId, jamId, jamInfo);
                console.log('RegisterResult OK: ', result);
                resolve(result)
            })
            .catch((error) => {
                console.log('AUTH SERVICE::::errorCode: ', error);
                var errorMessage = error.message;
                reject(errorMessage)
            })
        });
    };
};

