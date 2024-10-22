import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

function PaymentForm() {
  const [cardHolderName, setCardHolderName] = useState("");
  const [craditCardNumber, setCraditCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();

  // Retrieve the appointmentId and amount from the location state
  const { state } = useLocation();
  const { appointmentId, amount } = state || {};

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!appointmentId || !amount) {
      toast.error("Invalid appointment or amount.");
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/v1/user/create-payment`,
        { cardHolderName, craditCardNumber, cvv, appointmentId, amount  },
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Payment Successful");
        navigate('/my-apointments');
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form className="min-h-[80vh] flex items-center" onSubmit={onSubmitHandler}>
      <div className="flex flex-col gap-5 m-auto items-start p-8 min-w-[340px] sm:min-w-98 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">Payment Details</p>
        <p>Please enter your payment information to proceed</p>
        
        <p className="text-lg font-semibold">Amount to Pay: ${amount}</p>

        <div className="w-full flex flex-col mb-1">
          <label className="text-zinc-600 font-medium text-[17px]" htmlFor="cardholderName">Cardholder Name:</label>
          <input
            className="border-2 py-0.4 px-1 w-full rounded mt-1 text-zinc-600 text-sm focus:outline-blue-500"
            type="text"
            id="cardholderName"
            onChange={(e) => setCardHolderName(e.target.value)}
            value={cardHolderName}
            required
          />
        </div>

        <div className="w-full flex flex-col mb-1">
          <label className="text-zinc-600 font-medium text-[17px]" htmlFor="craditCardNumber">Card Number:</label>
          <input
            className="border-2 py-0.4 px-1 w-full rounded mt-1 text-zinc-600 text-sm focus:outline-blue-500"
            type="text"
            id="craditCardNumber"
            maxLength="16"
            onChange={(e) => setCraditCardNumber(e.target.value)}
            value={craditCardNumber}
            required
            placeholder="1234 5678 9012 3456"
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
