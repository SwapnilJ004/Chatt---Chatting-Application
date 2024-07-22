import mongoose from "mongoose"

const conversationSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            reference: "User"
        },
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            reference: "Message",
            default: []
        }
    ]
}, {timestamps: true}
)

const conversation = mongoose.model("Conversation", conversationSchema);

export default conversation;