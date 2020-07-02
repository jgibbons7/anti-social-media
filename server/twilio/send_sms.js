// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
require('dotenv').config()
const {AUTH_TOKEN} = process.env
const accountSid = 'AC5e585df48770a27271868597e08780d8';
const authToken = AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+12017482163',
     to: '+18016645379'
   })
  .then(message => console.log(message.sid));
  
  
  
  //     \server/twilio/send_sms.js