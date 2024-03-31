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
    addressId: {
        type: Schema.Types.ObjectId,
        ref: "Address",
    },
    cartTotal: Number,
    deliveredBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    orderId: String,
    paymentStatus: {
        type: String,
        enum: ["success", "failed", "pending", "abandoned"],
        default: "pending",
    },
    amountPaid: Number,
    placedOn: {
        type: Schema.Types.Date,
        default: Date.now
    },
    orderStatus: {
        type: String,
        enum: ['placed', 'picked-up', 'on-the-way', 'delivered', 'failed'],
        default: 'placed'
    },
    deliveredOn: {
        type: Schema.Types.Date,
    }
});

const OrderModel = model("order", OrderSchema);

export default OrderModel;
