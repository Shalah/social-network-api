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
    // This is a subdocument for thoughts
    thoughts: [  
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought' // This si the reference for the document model
        }
    ],

    // This is a subdocument for friends
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'  // This si the reference for the document model
        }
    ]
},
{
    toJSON: {
        virtuals: true
    },

    id: false
});


const User = model('User', UserSchema);

module.exports = User;