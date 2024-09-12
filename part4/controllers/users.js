const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {'title':1,'author':1,'url':1})
    response.json(users)
  })

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  if (username.length <=3 || password.length <= 3) {
    response.status(401).json({
      error: 'username and password must be more than 3 chars'
    })
  } else {
    const user = new User({
      username,
      name,
      passwordHash,
    })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  }
})

module.exports = usersRouter