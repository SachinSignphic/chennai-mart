import { model, Schema } from "mongoose";

const OrderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    cartId: {
        type: Schema.Types.ObjectId,
        ref: "Cart",    
    },
    cartTotal: Number,
    // deliveredBy: {
    //     // here create a ref for driver id
    // }
    orderId: String,
    paymentStatus: {
        type: String,
        enum: ['success', 'failed', 'pending'],
        default: 'pending'
    },
    amountPaid: Number
});

const OrderModel = model("order", OrderSchema);

export default OrderModel;
