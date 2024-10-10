import mongoose, { Document, ObjectId, Schema } from "mongoose";

// Enum to define user roles in the chat (User or Host)
export enum SenderRole {
  USER = 'user',
  HOST = 'host'
}

// Interface for a single message in the chat
export interface Message {
  sender_id: ObjectId; // ID of the user or host sending the message
  sender_role: SenderRole; // Role of the sender (user or host)
  recipient_id: ObjectId; // ID of the recipient (host or user)
  message: string; // The actual message content
  timestamp: Date; // Time the message was sent
}

// Interface for the entire chat document
export interface ChatDocument extends Document {
  user_id: ObjectId; // The user participating in the chat
  host_id: ObjectId; // The host participating in the chat
  messages: Message[]; // List of messages in the chat
}

// Schema for a single message in the chat
const MessageSchema: Schema = new Schema({
  sender_id: { type: mongoose.Types.ObjectId, required: true }, // Either user or host
  sender_role: { type: String, enum: [SenderRole.USER, SenderRole.HOST], required: true },
  recipient_id: { type: mongoose.Types.ObjectId, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now } // Timestamp of the message
});

// Chat schema with user and host as participants and the message array
const ChatSchema: Schema<ChatDocument> = new Schema({
  user_id: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  host_id: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  messages: [MessageSchema] // Embedding message schema as an array
}, { timestamps: true });

// Creating the Chat model
const ChatModel = mongoose.model<ChatDocument>('Chat', ChatSchema);
export default ChatModel;
