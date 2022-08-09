import mongoose from "mongoose";

const foodSchema = mongoose.Schema({
    title: String,
    price: Number,
    image: String,
    category: String,
    desc: String,
    createdAt: {
        type: Date,
        default: new Date(),
    }
})

const foodModel = mongoose.model("Food", foodSchema);

export default foodModel;