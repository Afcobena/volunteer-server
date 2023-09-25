const { Schema, model } = require("mongoose");

const arrCollaborations = require("../utils/collaborations.js");

const commentSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    text: {
      type: String,
    }

  },
  
  {
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;





