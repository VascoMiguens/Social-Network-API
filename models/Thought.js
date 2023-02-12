const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const dateformat = require("../utils/helpers");

// Schema to create Thoughts model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: [true, "You must leave a thought"],
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateformat(timestamp),
    },
    username: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reaction: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
