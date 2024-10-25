import mongoose, { Document, Schema } from "mongoose";

// Define the Notification interface
export interface Notification {
    message: string;
    recipient: string;  // Could be a user ID or email
    is_read: boolean;
    type: string;  // e.g., "info", "warning", "error"
}

// Extend Notification interface with mongoose Document
export interface NotificationDocument extends Notification, Document {
    _id: string;
}

// Define the Notification Schema
const NotificationSchema: Schema<NotificationDocument> = new Schema({
    message: { type: String, required: true },
    recipient: { type: String, required: true },  // Assuming recipient is a string identifier
    is_read: { type: Boolean, default: false },
    type: { type: String, enum: ["info", "warning", "error"], default: "info" },  // Notification type
}, { timestamps: true });

// Create the Notification model
const NotificationModel = mongoose.model<NotificationDocument>("Notification", NotificationSchema);

export default NotificationModel;
