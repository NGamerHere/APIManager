import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    element: { type: String, default: "user" }
});

const user=mongoose.model('user',userSchema);

export default user;