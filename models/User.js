const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },

    email: {
        type: String,
        unique: true,
        required: true,
    },
      
},
{
    toJSON: {
        virtuals: true
    },

    id: false
});


const User = model('User', UserSchema);

module.exports = User;