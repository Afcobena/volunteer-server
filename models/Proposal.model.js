const { Schema, model } = require("mongoose");

const arrCategory = require("../utils/category.js");
const arrImages = require("../utils/image.category.js");

const proposalSchema = new Schema(
  {
    image: {
      type: String,
      enum: arrImages,
      required: true,
    },

    title: {
      type: String,
      unique: true,
      required: true,
    },

    category: {
      type: String,
      enum: arrCategory,
      required: true,
    },

    text: {
      type: String,
      required: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  
  {
    timestamps: true,
  }
);

const Proposal = model("Proposal", proposalSchema);

module.exports = Proposal;
