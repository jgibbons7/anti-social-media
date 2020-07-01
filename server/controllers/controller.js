const bcrypt = require('bcrypt')

module.exports = {
  createUser: async (req, res) => {
    const db = req.app.get('db')
    const {username, password, age} = req.body

    const existingUser = await db.check_user(username)
    if (existingUser[0]) {
      return res.status(409).send('You already exist good sir.')
    }

    const salt = bcrypt.genSaltSync(7)
    const hash = bcrypt.hashSync(password, salt)
    const newUser = await db.create_user([username, hash])
    const newUserAge = await db.user_info(age)

    req.session.user = {
      userId: newUser[0].id,
      username: newUser[0].username
    }

    res.status(200).send(req.session.user)

  },
  
  loginUser: async (req, res) => {
    const db = req.app.get('db')
    const {username, password} = req.body

    const user = await db.check_user(username)
    if(!user) {
      return res.status(404).send('You need to register')
    } else {
      const authenticated = bcrypt.compareSync(password, user[0].password)
      if (authenticated) {
        req.session.user = {
          userId: user[0].id,
          username: user[0].username, 
          profilePic: user[0].profileimage
        }
        res.status(200).send(req.session.user)
      } else {
        res.status(403).send('Email or password is incorrect')
      }
    }
  },


  deleteUser: async (req, res) => {},
  updateUser: async (req, res) => {},

  createHobby: async (req, res) => {
    const db = req.app.get('db')
    const {hobby, hobbyImage, userId} = req.body
    const newHobby = await db.create_hobby(hobby, hobbyImage, userId)
    res.status(200).send(newHobby)

  },

  deleteHobby: async (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    const deleted = await db.delete_hobby(id)
    res.status(200)
  },

  updateHobby: async (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    const {body} = req.body
    const updated = await db.update_hobby(id, body)
    res.status(200).send(updated)
  },

  getHobbies: async (req, res) => {
    const db = req.app.get('db')
    const {userId} = req.params
    const getHobby = await db.get_hobbies(userId)
    res.status(200).send(getHobby)
  }
}