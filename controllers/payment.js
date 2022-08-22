import mongoose from "mongoose";
import SSLCommerzPayment from "sslcommerz";
import { v4 as uuidv4 } from 'uuid';
import paymentModel from "../models/payment.js";

export const getDataForSSL = async (req, res) => {
    console.log(req.body);
    const data = {
        total_amount: req?.body?.totalAmount,
        currency: 'BDT',
        tran_id: uuidv4(),
        success_url: 'http://localhost:5000/payment/success',
        fail_url: 'http://localhost:5000/payment/fail',
        cancel_url: 'http://localhost:5000/payment/cancel',
        ipn_url: 'http://localhost:5000/payment/ipn',
        shipping_method: 'Courier',
        number_of_item: req?.body?.totalQuantity,
        product_name: req?.body?.productDetails,
        product_category: 'Food',
        product_profile: 'General',
        cus_name: req?.body?.name,
        cus_email: req?.body?.email,
        cus_add1: req?.body?.city,
        cus_city: req?.body?.city,
        cus_postcode: req?.body?.postalCode,
        cus_country: req?.body?.country,
        cus_phone: req?.body?.phone,
        ship_name: req?.body?.name,
        ship_add1: req?.body?.city,
        ship_city: req?.body?.city,
        ship_postcode: req?.body?.postalCode,
        ship_country: req?.body?.country,
        multi_card_name: 'othercard',
    };

    if (data) {
        const newPayment = new paymentModel({
            ...data,
            createdAt: new Date().toISOString(),
        });
        await newPayment.save();
    };

    const sslcommer = new SSLCommerzPayment(process.env.STORE_ID, process.env.STORE_PASS, false) //true for live default false for sandbox
    sslcommer.init(data).then(data => {
        if (data?.GatewayPageURL) {
            res.status(200).json(data.GatewayPageURL);
        }
        else {
            return res.status(400).json({ message: 'Payment session failed' })
        }
    });

};


export const successMsg = async (req, res) => {
    const { tran_id, val_id } = req.body;

    const filter = { tran_id: tran_id }
    const updateDoc = {
        val_id: val_id
    }
    await paymentModel.updateOne(filter, updateDoc);

    res.status(200).redirect(`http://localhost:3000/payment/success/${tran_id}`);
};

export const failMsg = async (req, res) => {
    const { tran_id } = req.body;

    const query = { tran_id: tran_id };
    await paymentModel.deleteOne(query);

    res.status(400).redirect('http://localhost:3000/payment/fail');
};

export const cancelMsg = async (req, res) => {
    const { tran_id } = req.body;

    const query = { tran_id: tran_id };
    await paymentModel.deleteOne(query);

    res.status(400).redirect('http://localhost:3000/home');
};

export const ipnMsg = async (req, res) => {
    res.status(400).redirect('http://localhost:3000/home');
};