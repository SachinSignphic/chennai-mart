import { model, Schema } from "mongoose";

const AddressSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    addresses: [
        {
            type: {
                type: String,
                enum: ["billing", "shipping"],
                default: "shipping",
            },
            firstName: String,
            lastName: String,
            mobile: String,
            email: String,
            streetLandmark: String,
            city: String,
            pincode: Number,
            state: String,
            country: String,
        },
    ],
});

const AddressModel = model("address", AddressSchema);

export default AddressModel;
