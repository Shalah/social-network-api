const { Schema, model } = require('mongoose');

const userSchema = new Schema({
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
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Enter a valid Email!"]
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

userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;