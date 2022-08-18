const { Schema, model } = require("mongoose");

const arrCollaborations = require("../utils/collaborations.js");

const collaborateSchema = new Schema(
  {
    help: {
      type: String,
      enum: arrCollaborations,
      required: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    proposal: {
      type: Schema.Types.ObjectId,
      ref: "Proposal",
    },

  },
  
  {
    timestamps: true,
  }
);

const Collaborate = model("Collaborate", collaborateSchema);

module.exports = Collaborate;





