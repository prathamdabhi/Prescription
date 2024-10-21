import React, { useState } from "react";
import { toast } from "react-toastify";

function PaymentForm() {
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
 

  
  const onSubmitHandler = (e) => {
    e.preventDefault();
    // Simple validation example
    if (!cardholderName || !cardNumber || !expiryDate || !cvv) {
      toast.error("Please fill in all fields.");
      return;
    }
    
    toast.success("Payment processed successfully!");
    console.log("Payment details submitted.");
  };

  return (
    <form className="min-h-[80vh] flex items-center" onSubmit={onSubmitHandler}>
      <div className="flex flex-col gap-5 m-auto items-start p-8 min-w-[340px] sm:min-w-98 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">Payment Details</p>
        <p>Please enter your payment information to proceed</p>
        
        <div className="w-full flex flex-col mb-1">
          <label className="text-zinc-600 font-medium text-[17px]" htmlFor="cardholderName">Cardholder Name:</label>
          <input
            className="border-2 py-0.4 px-1 w-full rounded mt-1 text-zinc-600 text-sm focus:outline-blue-500"
            type="text"
            id="cardholderName"
            onChange={(e) => setCardholderName(e.target.value)}
            value={cardholderName}
            required
          />
        </div>

        <div className="w-full flex flex-col mb-1">
          <label className="text-zinc-600 font-medium text-[17px]" htmlFor="cardNumber">Card Number:</label>
          <input
            className="border-2 py-0.4 px-1 w-full rounded mt-1 text-zinc-600 text-sm focus:outline-blue-500"
            type="text"
            id="cardNumber"
            maxLength="16"
            onChange={(e) => setCardNumber(e.target.value)}
            value={cardNumber}
            required
            placeholder="1234 5678 9012 3456"
          />
        </div>

        <div className="w-full flex flex-col mb-1">
          <label className="text-zinc-600 font-medium text-[17px]" htmlFor="expiryDate">Expiry Date (MM/YY):</label>
          <input
            className="border-2 py-0.4 px-1 w-full rounded mt-1 text-zinc-600 text-sm focus:outline-blue-500"
            type="date"
            id="expiryDate"
            onChange={(e) => setExpiryDate(e.target.value)}
            value={expiryDate}
            required
            placeholder="MM/YY"
          />
        </div>

        <div className="w-full flex flex-col mb-1">
          <label className="text-zinc-600 font-medium text-[17px]" htmlFor="cvv">CVV:</label>
          <input
            className="border-2 py-0.4 px-1 w-full rounded mt-1 text-zinc-600 text-sm focus:outline-blue-500"
            type="text"
            id="cvv"
            maxLength="3"
            onChange={(e) => setCvv(e.target.value)}
            value={cvv}
            required
            placeholder="123"
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white py-2 px-9 rounded-full border mt-2 w-full hover:scale-105 transition-all duration-300"
        >
          Make Payment
        </button>
      </div>
    </form>
  );
}

export default PaymentForm;
