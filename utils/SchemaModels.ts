import mongoose from "mongoose";

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
  },
})

const MessageSchema = new mongoose.Schema({
    id: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user', 'assistant', 'system'],
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
});
  
const ChatSchema = new mongoose.Schema({
    id: {
      type: String,
      required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    messages: {
      type: [MessageSchema],
      required: true,
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
});

const CharacterSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
    },
    avatar: {
        type: String,
    },
    prompt: {
        type: String,
        required: true,
    },
    
})

export const CharacterModel = mongoose.models.Character || mongoose.model("Character", CharacterSchema)
export const MessageModel = mongoose.models.Message || mongoose.model("Message", MessageSchema)
export const ChatModel = mongoose.models.Chat || mongoose.model("Chat", ChatSchema)
export const UserModel = mongoose.models.User || mongoose.model("User", UserSchema)