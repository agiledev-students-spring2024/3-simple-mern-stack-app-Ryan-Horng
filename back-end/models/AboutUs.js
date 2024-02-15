const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
  name: {type: String},
  para1: {type: String},
  para2: {type: String}
})


const AboutUs = mongoose.model('AboutUs', aboutUsSchema)

module.exports = {
  AboutUs,
}
