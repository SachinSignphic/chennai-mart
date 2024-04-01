import { model, Schema } from "mongoose";

const DriverSchema = new Schema({
    firstName: String,
    lastName: String,
    phone: String,
    age: Number,
    otp: String,
    // All other stuff deal with it later
});

const DriverModel = model('driver', DriverSchema);

export default DriverModel;