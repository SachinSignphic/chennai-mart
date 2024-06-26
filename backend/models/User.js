import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: String,
    phone: String,
    age: Number,
    otp: String,
    role: {
        type: String,
        enum: ['CUSTOMER', 'DRIVER', 'ADMIN'],
        default: 'CUSTOMER'
    }
});

const UserModel = model('user', UserSchema);

export default UserModel;