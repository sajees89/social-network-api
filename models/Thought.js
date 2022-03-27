const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema(
    {
      reactionId: {
          type: Schema.Types.ObjectId,
          default: () => new Types.ObjectId()
        },
        username: {
            type: String,
            required: true,
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 200
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM Do YYYY')
        }
      },
      {
        toJSON: {
            virtuals: true,
            getters: true
      },
        id: false
      }
    );

    const ThoughtSchema = new Schema(
        {
            thoughtText: {
                type: String,
                required: true,
                minlength: 1,
                maxlength: 200
            },
            createdAt: {
                type: Date,
                default: Date.now,
                get: (createdAtVal) => moment(createdAtVal).format('MMM Do YYYY')
            },
            username: {
                type: String,
                required: true,
            },
            reactions: [ReactionSchema],
        },
        {
            toJSON: {
                virtuals: true,
                getters: true
            },
            id: false
        }
       );

    ThoughtSchema.virtual('reactionsCount').get(function() {
        return this.reactions.length;
    });

    const Thought = model('Thought', ThoughtSchema);

    module.exports = Thought;