import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    cardHolderName: { type: String, required: true },
    craditCardNumber: { type: Number, required: true },
    amount: { type: Number, required: true, default: 0 },
    paymentStatus: { type: Boolean, default: false },
    transactionId: { type: String, required: true },
    date: { type: Number, default: Date.now() },
    cvv: { type: Number, required: true },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
