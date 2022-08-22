import mongoose from "mongoose";

const foodSchema = mongoose.Schema({
    title: String,
    price: Number,
    imageFile: String,
    category: String,
    desc: String,
    creator: String,
    review: Array,
    createdAt: {
        type: Date,
        default: new Date(),
    }
});

const foodModel = mongoose.model("Food", foodSchema);

export default foodModel;