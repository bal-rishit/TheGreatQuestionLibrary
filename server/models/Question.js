import { Schema, model } from "mongoose";

const QuestionSchema = new Schema({
  userId:{
    type: String,
    required: true,
  },
  stream: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
    required: false,
  },
  selectedOptions: {
    option1: {
      type: Boolean,
      default: false,
    },
    option2: {
      type: Boolean,
      default: false,
    },
    option3: {
      type: Boolean,
      default: false,
    },
    option4: {
      type: Boolean,
      default: false,
    },
  },
  givenOptions: {
    option1: {
      type: String,
      default: '',
    },
    option2: {
      type: String,
      default: '',
    },
    option3: {
      type: String,
      default: '',
    },
    option4: {
      type: String,
      default: '',
    },
  },
},
{ timestamps: true }
);

export default model("Question", QuestionSchema);


