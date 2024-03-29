import { model, Schema } from "mongoose";

const CartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    items: [
        {
            productId: String,
            quantity: String,
            discount: Number,
        },
    ],
    status: {
        type: String,
        enum: ['new', 'paid'],
        default: 'new'
    }
});

const CartModel = model("cart", CartSchema);

export default CartModel;
