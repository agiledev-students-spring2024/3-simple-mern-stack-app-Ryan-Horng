require('dotenv').config({ silent: true }) // load environmental variables from a hidden file named .env
const express = require('express') // CommonJS import style!
const morgan = require('morgan') // middleware for nice logging of incoming HTTP requests
const cors = require('cors') // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.
const mongoose = require('mongoose')

const app = express() // instantiate an Express object
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' })) // log all incoming requests, except when in unit test mode.  morgan has a few logging default styles - dev is a nice concise color-coded style
app.use(cors()) // allow cross-origin resource sharing

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

// connect to database
mongoose
  .connect(`${process.env.DB_CONNECTION_STRING}`)
  .then(data => console.log(`Connected to MongoDB`))
  .catch(err => console.error(`Failed to connect to MongoDB: ${err}`))

// load the database models we want to deal with
const { Message } = require('./models/Message')
const { User } = require('./models/User')

// a route to handle fetching all messages
app.get('/messages', async (req, res) => {
  // load all messages from database
  try {
    const messages = await Message.find({})
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})

// a route to handle fetching a single message by its id
app.get('/messages/:messageId', async (req, res) => {
  // load all messages from database
  try {
    const messages = await Message.find({ _id: req.params.messageId })
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})
// a route to handle logging out users
app.post('/messages/save', async (req, res) => {
  // try to save the message to the database
  try {
    const message = await Message.create({
      name: req.body.name,
      message: req.body.message,
    })
    return res.json({
      message: message, // return the message we just saved
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    return res.status(400).json({
      error: err,
      status: 'failed to save the message to the database',
    })
  }
})

app.get('/aboutus', (req, res) => {
  // load about me data
  const aboutus = {
    name: "Ryan Horng",
    para: 'I am a senior majoring in Economics and Computer Science. This is my second class with Mr. Bloomberg. I have previously taken his software engineering class last semester. Before attending NYU, I took a year at Rutgers University, but left due to preference and because Rutgers campus was atrocious. I have two dogs named Zoey and Duby, both corgis and hyperactive puppies. I enjoy writing stories in my free time and cooking, though I have been incredibly lazy in both hobbies. I am taking three CS elective courses this semester including this one. Also, the job search is taking the life out of me, somebody please fix this economy.',
    imageUrl: "https://media.licdn.com/dms/image/C4D03AQHuEtcpJZj2Ww/profile-displayphoto-shrink_200_200/0/1631398391722?e=1713398400&v=beta&t=hylakBzitFU9IHERIR-0AfFmSCl0sj27yzAk-r6HuAo"
  }
  res.json(aboutus)
})

// export the express app we created to make it available to other modules
module.exports = app // CommonJS export style!
