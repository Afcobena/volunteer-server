const { Schema, model } = require("mongoose");

const arrCategory = require("../utils/category.js");

const proposalSchema = new Schema(
  {
    

    date: {
      type: Date,
      min: '09/10',
      max: '09/10/2022'
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

    collaborate: {
      type: Schema.Types.ObjectId,
      ref: "Collaborate",
    },
  },
  
  {
    timestamps: true,
  }
);

const Proposal = model("Proposal", proposalSchema);

module.exports = Proposal;
