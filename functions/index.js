const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
require('dotenv').config();
const cors = require('cors')({origin: true});   // VERIFICA DESDE DÓNDE SE LANZA LA PETICION

admin.initializeApp();


// ver: https://www.youtube.com/watch?v=MeXLkNWTF_g

// GOOGLE DEVELOPERS https://console.developers.google.com/apis/credentials/consent?project=jammint

// FUENTE https://medium.com/@edigleyssonsilva/cloud-functions-for-firebase-sending-e-mail-1f2631d1022e


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions


// EL MAIL SE ENVIA CADA VEZ QUE SE REGISTRA UN DOC EN UNA COLLECTION
// source: https://softauthor.com/firebase-functions-send-email

let transporter = nodemailer.createTransport({
    host: "jammint-com.correoseguro.dinaserver.com",
    port: 25, //587
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "info@jammint.com",
      pass: "j@mmint2mil20"
    }
});

exports.sendRegistrationEmail = functions.firestore
    .document('invitations/{doc-id}')
    .onCreate((snap, context) => {   // I want this function to be fired when a document is created, so I am using onCreate() method. You can use onUpdate, onDelete or onWrite as well. 
        console.log('snap.data(): ', snap.data());

        const mailOptions = {
            from: 'info@jammint.com',
            to: snap.data().email,
            subject: 'Welcome to Barcelona',
            html: `
                <h1>Dear ${snap.data().firstName},</h1>
                <p>Thank you very much for your booking in ${snap.data().jamName}</p>
                <p>Note that we use <span>jammint</span> as a way to manage our bookings and communicate with ur guest.</p>
                <br />
                <br />
                <h1>This is your booking information:</h1>
                <h4>room Nr: ${snap.data().roomNr}</h4>
                <h4>Check-in: ${snap.data().checkIn}</h4>
                <h4>Check-out: ${snap.data().checkOut}</h4>
                <h4>Rent [€/Mo]: ${snap.data().rent}</h4>
                <h4>Deposit [€]: ${snap.data().deposit}, </h4>
                <p>The next step is to prepare your rent contract, please click in the following link in order to acces our registration form:</p>
                <br />
                <p>${snap.data().registrationURL}</p>
                <br />
                <p>Ariel Cima</p>
            `  // One thing worth pointing out here is that the snap.data() has information about the newly added document.
        };
        return transporter.sendMail(mailOptions, (error, data) => {
            if (error) {
                console.log('error in transport.sendMail', error)
                return
            }

            console.log('send email launched, data: ', data)
            console.log("Sent!")
        });

        // verify connection configuration
        // return transporter.verify(function(error, success) {
        //     if (error) {
        //     console.log(error);
        //     } else {
        //     console.log("Server is ready to take our messages");
        //     }
        // });
});
        
