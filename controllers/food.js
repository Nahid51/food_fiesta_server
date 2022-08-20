import mongoose from "mongoose";
import foodModal from "../modals/food.js";

export const addFood = async (req, res) => {
    const food = req.body;
    const newFood = new foodModal({
        ...food,
        createdAt: new Date().toISOString(),
    });

    try {
        await newFood.save();
        res.status(201).json(newFood);
    }
    catch (error) {
        res.status(404).json({ message: "Something went wrong!" });
    }

};

export const getFoods = async (req, res) => {
    try {
        const foods = await foodModal.find();
        res.status(200).json(foods);
    }
    catch (error) {
        res.status(404).json({ message: "Something went wrong!" });
    }

};

export const getFoodsByUser = async (req, res) => {
    const { email } = req.params;

    try {
        const userFoods = await foodModal.find({ creator: email });
        res.status(200).json(userFoods);
    }

    catch (error) {
        res.status(404).json({ message: "Something went wrong!" });
    }

};


export const deleteFood = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `No Food exist with id: ${id}` });
        }

        await foodModal.findByIdAndRemove(id);
        res.json({ message: "Tour deleted successfully" });
    }

    catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};


export const updateFood = async (req, res) => {
    const { id } = req.params;
    const { title, desc, category, imageFile, price, creator } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `No Food exist with id: ${id}` });
        }

        const updatedFood = {
            creator,
            title,
            desc,
            category,
            imageFile,
            price,
            _id: id,
        };
        await foodModal.findByIdAndUpdate(id, updatedFood, { new: true });
        res.json(updatedFood);
    }

    catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};


export const reviewFood = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `No Food exist with id: ${id}` });
        }

        const foodReview = {
            review: req.body
        }
        const updateDoc = { $push: foodReview };
        await foodModal.findByIdAndUpdate(id, updateDoc, { new: true });
        res.json(foodReview);
    }

    catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }

};
