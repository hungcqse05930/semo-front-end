/*eslint eqeqeq:0*/
// libraries
// import firebase from 'firebase/app'

// set firebase config
const firebaseConfig = ({
    apiKey: "AIzaSyB19S8j2n-M-hFbYiPgL6X2SLo8K_jDlZo",
    authDomain: "semo-o1805.firebaseapp.com",
    databaseURL: "https://semo-o1805.firebaseio.com",
    projectId: "semo-o1805",
    storageBucket: "semo-o1805.appspot.com",
    messagingSenderId: "1083903204858",
    appId: "1:1083903204858:web:babd3c6c7a677eee415843"
});

// firebase auth for phone number
// function phoneAuth(firebase, phone_number) {
//     phone_number = formatNumber(phone_number);
//     // processingUi('phone-field', 'sign-in-button');

//     if (!phone_number instanceof Error) {
//         // sending request for OTP to Firebase
//         firebase.auth().signInWithPhoneNumber(phone_number, window.recaptchaVerifier).then(function (confirmationResult) {
//             window.confirmationResult = confirmationResult;
//             let coderesult = confirmationResult;
//             console.log(coderesult);
//             // alert('OTP sent');
//             // move to verify
//             // moveForwardPage('phone-screen', 'verify-screen');
//         }).catch(function (error) {
//             // errorInput('phone-field', 'phone-error', getError(error));
//             // unprocessingUi('phone-field', 'sign-in-button', 'Tiếp tục');
//             grecaptcha.reset(window.recaptchaWidgetId);
//         });
//     }

// };



module.exports = {
    firebaseConfig,
    // formatNumber
}