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
    addressId: {
        type: Schema.Types.ObjectId,
        ref: "Address",
    },
});

const CartModel = model("user", CartSchema);

export default CartModel;
