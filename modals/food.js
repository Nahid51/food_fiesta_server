import mongoose from "mongoose";

const foodSchema = mongoose.Schema({
    title: String,
    price: Number,
    imageFile: String,
    category: String,
    desc: String,
    creator: String,
    createdAt: {
        type: Date,
        default: new Date(),
    }
});

const foodModal = mongoose.model("Food", foodSchema);

export default foodModal;