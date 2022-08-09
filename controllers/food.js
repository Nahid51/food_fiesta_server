import foodModel from "../modals/food.js";

export const createFood = async (req, res) => {
    const food = req.body;
    const newFood = new foodModel({
        ...food,
        createdAt: new Date().toISOString()
    });

    try {
        await newFood.save();
        res.statue(201).json(newFood);
    }
    catch (error) {
        res.status(404).json({ message: "Something went wrong!" });
    }
};

export const getFoods = async (req, res) => {
    try {
        const foods = await foodModel.find();
        res.status(200).json(foods);
    }
    catch (error) {
        res.status(404).json({ message: "Something went wrong!" });
    }
};