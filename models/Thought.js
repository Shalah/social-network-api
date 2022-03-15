const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        nim: 1,
        max: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
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


const Thought = model('User', thoughtSchema);

module.exports = Thought;