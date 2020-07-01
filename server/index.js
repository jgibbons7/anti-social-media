require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env
const ctrl = require('./controllers/controller')

const app = express()
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
