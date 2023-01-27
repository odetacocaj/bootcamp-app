const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        maxLength: [30, 'Name should be less than 30 characters!']
    },
    email: {
        type: String,
        required: [true, 'Email field is required'],
        unique: true,
        validate: [validator.isEmail, 'Email is not valid!']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password should have a minimum of 7 characters'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date

})


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    this.password = await bcrypt.hash(this.password,parseInt(process.env.SALT))
})

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}


userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// // Generate password reset token
// userSchema.methods.getResetPasswordToken = function () {
//     // Generate token
//     const resetToken = crypto.randomBytes(20).toString('hex');

//     // Hash and set to resetPasswordToken
//     this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

//     // Set token expire time
//     this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

//     return resetToken

// }

module.exports = mongoose.model('User', userSchema);