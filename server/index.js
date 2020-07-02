require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env
const ctrl = require('./controllers/controller')


const app = express()

// CHAT APP //
// var app1 = express()
// var http = require('http').createServer(app1)
// var io = require('socket.io')(http)

// app1.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html')
// })

// http.listen(4001, () => {
//   console.log('listening on *:4001')
// })

// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });

// io.on('connection', (socket) => {
//   socket.on('chat message', (msg) => {
//     io.emit('chat message', msg);
//   });
// });

server = app.listen(4001, function() {
  console.log(`Chat is running on 4001`)
})

var socket = require('socket.io')
io = socket(server)

io.on('connection', (socket) => {
  console.log(socket.id)
});

io.on('connection', (socket) => {
  console.log(socket.id)

  socket.on('SEND_MESSAGE', function(data){
      io.emit('RECEIVE_MESSAGE', data)
  })
})

// CHAT APP //

// TEXT APP //
// const http = require('http')
// const MessagingResponse = require('twilio').twiml.MessagingResponse

// const app2 = express()
// app2.post('/sms', (req, res) => {
//   const twiml = new MessagingResponse();

//   twiml.message('The Robots are coming! Head for the hills!');

//   res.writeHead(200, {'Content-Type': 'text/xml'});
//   res.end(twiml.toString());
// });

// http.createServer(app2).listen(4002, () => {
//   console.log('Twilio server listening on port 4002');
// });

const bodyParser = require('body-parser');
// const pino = require('express-pino-logger')()
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
  );

app.use(bodyParser.json())
// app2.use(pino)
  
app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.post('/api/messages', (req, res) => {
  res.header('Content-Type', 'application/json')
  client.messages
  .create({
    from: process.env.TWILIO_PHONE_NUMBER,
    to: req.body.to,
    body: req.body.body
  })
  .then(() => {
    res.send(JSON.stringify({ success: true }))
  })
  .catch(err => {
    console.log(err);
    res.send(JSON.stringify({ success: false }))
  })
})

// app2.listen(4002, () =>
//   console.log('Twilio server is running on 4002')
// );

// TEXT APP //



app.use(express.json())

app.use(session({
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 1000*60*60*24},
  secret: SESSION_SECRET
}))

app.use(express.static(`${__dirname}/../build`));
massive({
  connectionString: CONNECTION_STRING,
  ssl: {rejectUnauthorized: false}
}).then(db => {
  app.set('db', db)
  console.log('DB Connected')
  app.listen(SERVER_PORT, () => console.log(`Big Brother watching on ${SERVER_PORT}`))
}).catch(err => console.log(err))

app.post('/api/user/register', ctrl.createUser)
app.post('/api/user/login', ctrl.loginUser)
app.delete('/api/user/:id', ctrl.deleteUser)
app.put('/api/user/:id', ctrl.updateUser)

app.post('/api/hobby', ctrl.createHobby)
app.delete('/api/hobby/:id', ctrl.deleteHobby)
app.put('/api/hobby/:id', ctrl.updateHobby)

app.get('/api/hobby/:userId', ctrl.getHobbies)
