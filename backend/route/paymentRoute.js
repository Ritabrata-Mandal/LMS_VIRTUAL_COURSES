import express from 'express'
import Razorpay from 'razorpay';
import { RazorpayOrder, verifyPayment } from '../controller/orderController.js';

const paymentRouter = express.Router();

paymentRouter.post("/razorpay-order",RazorpayOrder);
paymentRouter.post("/verifypayment",verifyPayment);

export default paymentRouter;