import { Schema, model } from "mongoose";

const PaperSchema = new Schema({
  userId:{
    type: String,
    required: true,
  },
  paperTitle:{
    type: String,
    required: true,
  },
  paperLink:{
    type: String,
    required: true,
  }
},
{ timestamps: true }
);

export default model("Paper", PaperSchema);


