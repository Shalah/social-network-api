const { Schema, model } = require('mongoose');

// This is for the Reaction Schema

const ReactionSchema = new Schema({
    reactionID: {
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


const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        nim: 1,
        max: 280,
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: 
        [ReactionSchema]
    ,
},
{
    toJSON: {
        virtuals: true
    },

    id: false
});

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;