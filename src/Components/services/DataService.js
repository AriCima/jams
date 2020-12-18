import firebase from 'firebase';

export default class DataService {
    // USERS
    static saveUserInfoInFirestore(userId, userInfo) {
        return new Promise((resolve, reject) => {
            firebase.firestore()
                .collection('users')
                .doc(userId)
                .set({ 
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    email: userInfo.email
                })
                .then(
                    console.log("User information succesfully saved !")
                )
                .catch((error) => {
                    const errorCode = error.code;
                    console.log('User NOT added: ', errorCode);
                });
        });
    }

    static checkIfEmialExists(email) {
        return new Promise((resolve, reject) => {
            firebase.firestore()
                .collection('users')
                .where('email', '==', email)
                .get()
                .then((res) => {
                    const docExists = !res.empty;
                    resolve(docExists)
                })
        })
            .catch((error) => {
                const errorCode = error.code;
                // console.log('Usuario No Existe : ', errorCode);
            });
    }

    static getUserInfo(userId) {
        // console.log('user info called with: ', userId)
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('users').doc(userId).get()

                .then((result) => {
                    resolve(result.data()); // OBTENGO TODO LO QUE TENGO ALMACENADO DE ÉSTE USUARIO
                })
                .catch((error) => {
                    reject('Usuario no existe');
                });
        });
    }

    static getUserInfoById(userId) {
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('users').doc(userId).onSnapshot((doc) => {
                const userInfo = doc.data();
                // console.log("Current data: ", doc.data());
                resolve(userInfo);
            });
        })
            .catch((error) => {
                const errorCode = error.code;
                // console.log('Usuario No Existe : ', errorCode);
            });
    }

    // static getUserJams(userId) {
    //     return new Promise((resolve, reject) => {
    //         firebase.firestore()
    //         .collection('users')
    //         .doc(userId)
    //         .collection('userJams')
    //         .get()
    //         .then(result => {
    //             const jams = [];
    //             result.docs.forEach(d => {
    //                 const j = d.data();
    //                 j.id = d.id;
    //                 jams.push(j);
    //             });

    //             resolve(jams);
    //         });
    //     })
    //         .catch((error) => {
    //             const errorCode = error.code;
    //             // console.log('Usuario No Existe : ', errorCode);
    //         });
    // }


    static getUserJams = (userId, userJams) => {
        return new Promise((resolve, reject) => {
        firebase.firestore()
            .collection('users')
            .doc(userId)
            .collection('userJams')
            .orderBy('createdAt')
            .onSnapshot(userJams)
        });
    }


    // JAMS
    // Create
    static createJam(jamInfo, userId, email, firstName, lastName) {
        return new Promise((resolve, reject) => {
            firebase.firestore()
                .collection('jams')
                .add(jamInfo)
                .then((doc) => {
                    const jamId = doc.id;
                    const userInfo = { userId, email, firstName, lastName };
                    jamInfo.jamId = jamId;

                    if (jamInfo.jamType === 'rooms-rental') {
                        const rooms = Number(jamInfo.nrOfRooms);
                        for (let i = 0; i < rooms; i++) {
                          const roomNr = i + 1;
                          const roomInfo = {
                            balcony: "",
                            deposit: "",
                            exterior: "",
                            rent: "",
                            privBath: "",
                            roomNr,
                            sqm: "",
                          };
                          DataService.addNewRoom(jamId, roomInfo);
                        }
                    }
                    this.addJamToUser(jamId, userId, jamInfo);
                    this.addJammerToJam(jamId, userInfo);
                    resolve({ id: doc.id });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log('Jam could not be created: ', errorCode, errorMessage);
                });
        });
    };
    static editJamMainInfo(jamId, info) {
        return new Promise(() => {
            firebase.firestore()
            .collection('jams')
            .doc(jamId)
            .update(info)
            .then(function() {
                console.log("Document successfully updated!");
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
        });
    };
    static editJamDetails(jamId, info) {
        return new Promise(() => {
            firebase.firestore()
            .collection('jams')
            .doc(jamId)
            .update({ 
                'jamDetails.roomNr': info.roomNr,
                'jamDetails.address': info.address,
                'jamDetails.city': info.city,
                'jamDetails.zipCode': info.zipCode,
                'jamDetails.country': info.country
            })
            .then(function() {
                console.log("Document successfully updated!");
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
        });
    };
    static editLandlordInfo(jamId, info) {
        return new Promise(() => {
            firebase.firestore()
            .collection('jams')
            .doc(jamId)
            .update({ 
                'landlordInfo.name': info.name,
                'landlordInfo.lastName': info.lastName,
                'landlordInfo.docType': info.docType,
                'landlordInfo.docNr': info.docNr,
                'landlordInfo.address': info.address,
                'landlordInfo.city': info.city,
                'landlordInfo.zipCode': info.zipCode,
                'landlordInfo.country': info.country
            })
            .then(function() {
                console.log("Document successfully updated!");
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
        });
    };
    static editJamHouseRules(jamId, info) {
        return new Promise(() => {
            firebase.firestore()
            .collection('jams')
            .doc(jamId)
            .update({ 
                "jamDetails.houseRules.checkInFrom": info.checkInFrom,
                "jamDetails.houseRules.checkInProcess":info.checkInProcess,
                "jamDetails.houseRules.checkInTo":info.checkInTo,
                "jamDetails.houseRules.checkOutBefore":info.checkOutBefore,
                "jamDetails.houseRules.checkOutProcess":info.checkOutProcess,
                "jamDetails.houseRules.overnight":info.overnight,
                "jamDetails.houseRules.parties":info.parties,
                "jamDetails.houseRules.pets":info.pets,
                "jamDetails.houseRules.smoking":info.smoking,
                "jamDetails.houseRules.smokingBalcony":info.smokingBalcony,
            })
            .then(function() {
                console.log("Document successfully updated!");
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
        });
    };
    static startChat(chatId, chatInfo, user1Id, user2Id) {
        return new Promise((resolve, reject) => {
            firebase.firestore()
                .collection('jams')
                .doc(chatId)
                .set(chatInfo)
                .then(() => {
                    this.addJamToUser(chatId, user1Id, chatInfo);
                    this.addJamToUser(chatId, user2Id, chatInfo);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log('Chat could not be created: ', errorCode, ' / ', errorMessage);
                });
        });
    };
    static addJamToUser(jamId, userId, jamInfo) {

        return new Promise((resolve, reject) => {
            firebase.firestore()
                .collection('users')
                .doc(userId)
                .collection('userJams')
                .doc(jamId)
                .set(jamInfo)
                .then(() => {
                    console.log('Jam added to Jammer');
                })
            
                .catch((error) => {
                    const errorCode = error.code;
                    console.log('ERROR Jam NOT added to user: ', errorCode);
                });
        });
    };
    static addJammerToJam(jamId, userInfo) {
        return new Promise((resolve, reject) => {
            firebase.firestore()
                .collection('jams')
                .doc(jamId)
                .collection('jammers')
                .doc(userInfo.userId)
                .set(userInfo)
                .then((result) => {
                    console.log('Jammers succesfully UPDATED');
                    resolve(result);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    console.log('ERROR Jam NOT added to user: ', errorCode);
                });
        });
    };
    static createJamSections(jamId, section, content) {
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('jams').doc(jamId).collection(section)
                .add(content)
                .then((doc) => {
                    // console.log('section ', section, 'creada correctamente', doc.id)
                    resolve({ id: doc.id });
                })

                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // console.log('SECTION could not be created: ', errorCode, errorMessage);
                });
        });
    };

    // GET INFO
    static getJamToJoin(jamCode) {
        // console.log('JamCode recibido en el join del Data =', jamCode);
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('jams')
            .where('jamCode', '==', jamCode)
            .get()
            // .then((result) => {
            //     //console.log('el result del join = ', result);
            //     resolve(result.data());
            // })
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots

                        const reply = doc.data();
                        reply.jamId = doc.id;

                        resolve(reply);
                    });
                })

                .catch((error) => {
                    const errorCode = error.code;
                    // console.log('Jam NOT joined: ', errorCode);
                });
        });
    };
    static getJamInfoByCode(jamCode) {
        return new Promise((resolve, reject) => {
            // console.log('el ID con el que se pide la info de la jam = ', jamCode)
            firebase.firestore().collection('jams')
                .where('jamCode', '==', jamCode)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        resolve({ id: doc.id, data: doc.data() });
                    });
                })

                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // console.log('Error al cargar la JamInfo: ', errorCode, errorMessage);
                });
        });
    };
    static getJamInfoById(jamId) {
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('jams')
                .doc(jamId)
                .get()
                .then((result) => {
                    resolve(result.data());
                })

                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // console.log('Error al cargar la JamInfo: ', errorCode, errorMessage);
                });
        });
    };

    // static getBoardInfo(jamId, section) {
    //     return new Promise((resolve, reject) => {
    //         // //console.log('jamInfoBIS  ID de la jam = ', jamId)
    //         firebase.firestore().collection('jams')
    //             .doc(jamId)
    //             .collection(section)
    //             .orderBy('createdAt', 'asc')
    //             .get()
    //             .then((querySnapshot) => {
    //                 const result = [];
    //                 querySnapshot.forEach((doc) => {
    //                     // //console.log(doc.data())
    //                     const info = doc.data();
    //                     result.push(info);
    //                     // resolve({id: doc.id, data: doc.data()});
    //                 });
    //                 // console.log(`${section} content = `,result)
    //                 resolve(result);
    //             })
    //             .catch((error) => {
    //                 const errorCode = error.code;
    //                 const errorMessage = error.message;
    //                 // console.log('Error al cargar la info de ', section, errorMessage);
    //             });
    //     });
    // }

    static getBoardInfo = (jamId, section) => {
        return firebase.firestore()
            .collection('jams')
            .doc(jamId)
            .collection('board')
            .orderBy('createdAt', 'asc')
            .onSnapshot(section)
    };

    /* * * * * * * *  CHAT * * * * * * * * * * * * * * * */

    static getChatInfo(jamId) {
        return new Promise((resolve, reject) => {
            // //console.log('jamInfoBIS  ID de la jam = ', jamId)
            firebase.firestore()
                .collection('jams')
                .doc(jamId)
                .get()
                .then((doc) => {
                    resolve(doc.data());
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // console.log('Error al cargar la info de ', section, errorMessage);
                });
        });
    };
    static saveChatMessage(jamId, messageInfo) {
        return new Promise((resolve, reject) => {
            firebase.firestore()
                .collection('jams')
                .doc(jamId)
                .collection('messages')
                .add(messageInfo)
                .then((result) => {
                // console.log("message succesfully sent !")
                    resolve(result);
                })

                .catch((error) => {
                    const errorCode = error.code;
                // console.log('Message could not be sent: ', errorCode);
                });
        });
    };
    static getChatMessages(jamId) {
        return new Promise((resolve, reject) => {
            // //console.log('jamInfoBIS  ID de la jam = ', jamId)
            firebase.firestore()
                .collection('jams')
                .doc(jamId)
                .collection('messages')
                .orderBy('createdAt', 'asc')
                .get()
                .then((querySnapshot) => {
                    const result = [];
                    querySnapshot.forEach((doc) => {
                        // //console.log(doc.data())
                        const info = doc.data();
                        result.push(info);
                        // resolve({id: doc.id, data: doc.data()});
                    });
                    // console.log(`${section} content = `,result)
                    resolve(result);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // console.log('Error al cargar la info de ', section, errorMessage);
                });
        });
    };
    static updateJamInfo(jamId, jamField, newInfo) {
        return new Promise((resolve, reject) => {
            // //console.log('inputs en el dataservice ', jamCode, jammers);

            firebase.firestore().collection('jams').doc(jamId).update({ jamField: newInfo })

                .then((result) => {
                    // console.log("jamInfo succesfully UPDATED")
                    resolve(result);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    // console.log('ERROR jamInfo could NOT be updated: ', errorCode);
                });
        });
    }

    /* * * * * * * *  ROOMS  * * * * * * * * * * * * * * * */

    static getJamRooms(jamId) {
        return new Promise((resolve, reject) => {
            firebase.firestore()
                .collection('jams')
                .doc(jamId)
                .collection('rooms')
                // .get()
                // .then(result => {
                //     let rooms = [];
                //     result.docs.forEach(d => {
                //       let j = d.data();
                //       j.id = d.id;
                //       rooms.push(j);
                //     });
                //     resolve(rooms);
                // })
                .onSnapshot((result) => {
                    const rooms = [];
                    result.docs.forEach(d => {
                        const j = d.data();
                        j.id = d.id;
                        rooms.push(j);
                    });
                    resolve(rooms);
                });
        })
            .catch((error) => {
                const errorCode = error.code;
                console.log('Jam Rooms error : ', error);
            });
    };
    static getSingleRoomInfo(jamId, roomNr) {
        return new Promise((resolve, reject) => {
            firebase.firestore()
            .collection('jams')
            .doc(jamId)
            .collection('rooms')
            .where('roomNr', '==', roomNr)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    const info = doc.data()
                    resolve(info)
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
        })
    };
    static addRoomToJam(jamId, data) {
        return new Promise((resolve, reject) => {
            firebase.firestore()
            .collection('jams')
            .doc(jamId)
            .collection('rooms')
            .add(data)
            .catch(error => reject(error));
        });
    };

    // MESSAGES

    static saveMessage(jamId, section, messageInfo) {
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('jams').doc(jamId).collection(section)
                .add(messageInfo)
                .then((result) => {
                // console.log("message succesfully sent !")
                    resolve(result);
                })

                .catch((error) => {
                    const errorCode = error.code;
                // console.log('Message could not be sent: ', errorCode);
                });
        });
    };
    static getBoardMessages(jamId) {
        return new Promise((resolve, reject) => {
            const boardMessagesResult = [];

            firebase.firestore().collection('boardMessages').where('jamId', '==', jamId).orderBy('date')
                .get() // Where me devuelve todos los mensajes que tengan ese jamId
                .then(docs => {
                    docs.forEach((d) => {
                        boardMessagesResult.push(d.data());
                    });
                    resolve(boardMessagesResult);
                })
                .catch(error => reject(error));
        });
    };

    //  * * * * * * * JAMMERS  * * * * * * *

    static getJammers(jamId) {
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('jams').doc(jamId).collection('jammers')
                .get()
                .then((result) => {
                    const jammers = [];
                    result.docs.forEach((d) => {
                        const j = d.data();
                        j.userId = d.id;
                        jammers.push(j);
                    });
                    resolve(jammers);
                })

                .catch((error) => {
                    // console.log('error: ', error);
                });
        });
    };
    static getJammerInfo(jamId, jammerId) {
        return new Promise((resolve, reject) => {
            firebase.firestore()
                .collection('jams')
                .doc(jamId)
                .collection('jammers')
                .doc(jammerId)
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        const res = doc.data();
                        resolve(res);
                    } else {
                    // doc.data() will be undefined in this case
                        console.log('No such document!');
                    }
                })
                .catch((error) => {
                    console.log('Error getting document:', error);
                });
        });
    };
    static editJammerInfo(jamId, jammerId, info) {
        return new Promise(() => {
            firebase.firestore()
            .collection('jams')
            .doc(jamId)
            .update({ 
                "jamDetails.houseRules.checkInFrom": info.checkInFrom,
                "jamDetails.houseRules.checkInProcess":info.checkInProcess,
                "jamDetails.houseRules.checkInTo":info.checkInTo,
                "jamDetails.houseRules.checkOutBefore":info.checkOutBefore,
                "jamDetails.houseRules.checkOutProcess":info.checkOutProcess,
                "jamDetails.houseRules.overnight":info.overnight,
                "jamDetails.houseRules.parties":info.parties,
                "jamDetails.houseRules.pets":info.pets,
                "jamDetails.houseRules.smoking":info.smoking,
                "jamDetails.houseRules.smokingBalcony":info.smokingBalcony,
            })
            .then(function() {
                console.log("Document successfully updated!");
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
        });
    };
    static getJammersMessages(jamId) {
        return new Promise((resolve, reject) => {
            firebase.firestore()
                .collection('jams')
                .doc(jamId)
                .collection('jammersMessages')
                .orderBy('createdAt', 'asc')
                .get()
                .then((result) => {
                    const messages = [];
                    result.docs.forEach((d) => {
                        const j = d.data();
                        j.id = d.id;
                        messages.push(j);
                    });
                    resolve(messages);
                })

                .catch((error) => {
                    // console.log('error: ', error);
                });
        });
    };
    // guarda en jammers(jammerId) la info básica del register
    static saveUserInfoInJam(jamId, userId, jammerInfo) {
        const {firstName, lastName, email, registeredUser } = jammerInfo;
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('jams')
                .doc(jamId)
                .collection('jammers')
                .doc(userId)
                .set({
                    firstName, 
                    lastName,
                    email,
                    registeredUser
                })
                .then((res) => {
                    console.log("Document written with ID: ", res);
                    resolve(res);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    console.log('Tenant info could not be saved: ', errorCode);
                });
        });
    };
    // guarda en jammers(jammerId) la info del JamRegistrationForm
    static saveJammerInfoInJam(jamId, userId, jammerInfo) {
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('jams')
                .doc(jamId)
                .collection('jammers')
                .doc(userId)
                .set(jammerInfo)
                .then((res) => {
                    console.log("Document written with ID: ", res);
                    resolve(res);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    console.log('Jammer info could not be saved: ', errorCode);
                });
        });
    };
    static saveJammerInvitationReply(jamId, invId, replyInfo) {
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('jams')
                .doc(jamId)
                .collection('invitations')
                .doc(invId)
                .collection('userReply')
                .set(replyInfo)
                .then((res) => {
                    console.log("Document written with ID: ", res);
                    resolve(res);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    console.log('Jammer info could not be saved: ', errorCode);
                });
        });
    };

    //  * * * * * * * INVITATIONS * * * * * * * 
    static newTenantInvitation(jId, data) {
        return new Promise((resolve, reject) => {
            firebase.firestore()
                .collection('jams')
                .doc(jId)
                .collection('invitations')
                .add(data)
                .then((docRef) => {
                    resolve(docRef);
                    console.log('docRef: ', docRef);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    console.log('Message could not be sent: ', errorCode);
                });
        });
    };
    static getInvitationInfo(jamId, invId) {
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('jams')
            .doc(jamId)
            .collection('invitations')
            .doc(invId)
            .get()
            .then(result => {
                const invInfo = result.data();
                resolve(invInfo);
            })

            .catch((error) => {
                // console.log('error: ', error);
            });
        });
    };
    // BOOKINGS  Y4W-2a48
    static addNewRoomBooking(jamId, roomId, bookingInfo) {
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('jams')
                .doc(jamId)
                .collection('rooms')
                .doc(roomId)
                .collection('bookings')
                .add(bookingInfo)
                .then((docRef) => {
                    console.log('Document written with ID: ', docRef.id);
                    resolve(docRef);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    console.log('Message could not be sent: ', errorCode);
                });
        });
    };
    static addNewBookingRequest(bookingInfo) {
        return new Promise((resolve, reject) => {
            firebase.firestore()
                .collection('bookings')
                .add(bookingInfo)
                .then((docRef) => {
                    console.log('Document written with ID: ', docRef.id);
                    resolve(docRef);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    console.log('Message could not be sent: ', errorCode);
                });
        });
    };

    static getPreBookingInfo(bookingCode) {
        return new Promise((resolve, reject) => {
            firebase.firestore()
                .collection('preBookings')
                .where('bookingCode', '==', bookingCode)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, ' => ', doc.data());
                        resolve(doc.data());
                    });
                })
                .catch((error) => {
                    console.log('Error getting documents: ', error);
                });
        });
    }

    // static updateBookingSummary(jamId, roomId, bookingInfo) {
    //     return new Promise((resolve, reject) => {
    //         firebase.firestore().collection('jams')
    //             .doc(jamId)
    //             .collection('rooms')
    //             .doc(roomId)
    //             .set({
    //                 bookingInfo,
    //             }, { merge: true })
    //             .then((docRef) => {
    //                 console.log('Document updated with ID: ', docRef);
    //                 resolve(docRef);
    //             })
    //             .catch((error) => {
    //                 const errorCode = error.code;
    //             // console.log('Message could not be sent: ', errorCode);
    //             });
    //     });
    // }

    // static updateBooking(jamId, roomId, bookingId, field, newValue) {
    //     return new Promise((resolve, reject) => {
    //         firebase.firestore().collection('jams')
    //             .doc(jamId)
    //             .collection('rooms')
    //             .doc(roomId)
    //             .collection('bookings')
    //             .doc(bookingId)
    //             .update(
    //                 { [field]: newValue },
    //             )
    //             .then((docRef) => {
    //                 console.log('Document successfully updated: ', docRef.id);
    //                 resolve(docRef);
    //             })
    //             .catch((error) => {
    //                 const errorCode = error.code;
    //             // console.log('Message could not be sent: ', errorCode);
    //             });
    //     });
    // }

    static getRoomBookings(jamId, roomId) {
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('jams')
                .doc(jamId)
                .collection('rooms')
                .doc(roomId)
                .collection('bookings')
                .orderBy('checkIn', 'asc')
                .get()
                .then(result => {
                // console.log('result = ', result)
                    const roomBookings = result;
                    console.log.og(roomBookings);
                    resolve(roomBookings);
                })

                .catch((error) => {
                    // console.log('error: ', error);
                });
        });
    }

    // ROOMS
    static addNewRoom(jamId, roomInfo) {
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('jams')
                .doc(jamId)
                .collection('rooms')
                .add(roomInfo)
                .then((doc) => {
                    console.log('room succesfully added to jam: ', doc.data());
                    resolve(doc);
                })
                .catch((error) => {
                    const errorCode = error.code;
                // console.log('Message could not be sent: ', errorCode);
                });
        });
    }

    static getRoomInfo(jamId, roomNr) {
        console.log('roomId: ', roomNr);
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('jams')
                .doc(jamId)
                .collection('rooms')
                .where('roomNr', '==', roomNr)
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
                        const res = doc.data();
                        res.roomId = doc.id;
                        resolve(res);
                    });
                })
                .catch((error) => {
                    console.log('error: ', error);
                });
        });
    }
    static updateRoomInfo(jamId, roomId, data) {
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('jams')
                .doc(jamId)
                .collection('rooms')
                .doc(roomId)
                .update({
                    "rent": data.rent,
                    "deposit": data.deposit,
                    "expenses": data.expenses,
                    "sqm": data.sqm,
                    "exterior": data.exterior,
                    "balcony": data.balcony,
                    "privBath": data.privBath,
                    "roomNr": data.roomNr,
                })
                .then(function() {
                    console.log("Document successfully updated!");
                })
                .catch(function(error) {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
        });
    }
}
