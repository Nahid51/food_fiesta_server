import mongoose from "mongoose";

const paymentSchema = mongoose.Schema({
    total_amount: Number,
    currency: String,
    tran_id: String,
    val_id: String,
    success_url: String,
    fail_url: String,
    cancel_url: String,
    ipn_url: String,
    shipping_method: String,
    number_of_item: Number,
    product_name: String,
    product_category: String,
    product_profile: String,
    cus_name: String,
    cus_email: String,
    cus_add1: String,
    cus_city: String,
    cus_postcode: String,
    cus_country: String,
    cus_phone: String,
    ship_name: String,
    ship_add1: String,
    ship_city: String,
    ship_postcode: String,
    ship_country: String,
    multi_card_name: String,
    createdAt: {
        type: Date,
        default: new Date(),
    }
});

const paymentModel = mongoose.model("Payment", paymentSchema);

export default paymentModel;