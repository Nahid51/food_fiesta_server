import mongoose from "mongoose";

const foodSchema = mongoose.Schema({
    title: String,
    price: Number,
    imageFile: String,
    category: String,
    desc: String,
    email: String,
    creator: String,
    createdAt: {
        type: Date,
        default: new Date(),
    }
});

const foodModel = mongoose.model("Food", foodSchema);

export default foodModel;