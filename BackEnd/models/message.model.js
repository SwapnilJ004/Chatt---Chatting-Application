import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        reference: "User",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        reference: "User",
        required: true
    },
    message: {
        type: String,
        required: true
    },
}, {timestamps:  true}
)

const message = mongoose.model("Message", messageSchema);

export default message;