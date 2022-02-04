const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, 'Please provide company name'],
    },
    name: {
      type: String,
      required: [true, 'Please provide contact name for your company'],
    },
    email: {
      type: String,
      required: [true, 'Please provide company email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      required: false,
      maxlength: [15, 'Max phone number length if 15 digits'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false, // Don't send this to client for security reasons
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        // This only works on create and save
        validator: function (password) {
          return password === this.password
        },
        message: 'Passwords do not match',
      },
    },
  },
  {
    timestamps: true,
  }
)

// Middleware/hooks

// Hash password and remove passwordConfirm
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  this.passwordConfirm = undefined
  next()
})

// Check if password is correct, returns a boolean
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  console.log('in model now')
  return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
