import { model, Schema } from "mongoose";

const FeedbackSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    message: String,
    category: {
        type: String,
        enum: ['product', 'report']
    },
});

const FeedbackModel = model("feedback", FeedbackSchema);

export default FeedbackModel;
