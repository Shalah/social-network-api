const { Schema, Types } = require('mongoose');

// This is for the Reaction Schema

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },

    reactionBody: {
        type: String,
        required: true,
        max: 280
    },

    username: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: () => Date.now(),
    },
},
{
    toJSON: {
        getters: true
    }
});


// End of Reaction Subdocument schema

 
module.exports = ReactionSchema;