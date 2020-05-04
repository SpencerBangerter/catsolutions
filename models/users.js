var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

var userSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 6,
    max: 15
  },
  
  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ['user', 'admin'],
    required: true
  },
  //This array for what ever we are pushing input data into
  card: []
})

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) { return next() }
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err) { return next(err) }
    this.password = passwordHash
    next()
  })
})

userSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return cb(err)
    } else {
      if (!isMatch) {
        return cb(null, isMatch)
      } else {
        return cb(null, this)
      }
    }
  })
}

module.exports = mongoose.model('User', userSchema)
