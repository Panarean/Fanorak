import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./BuyNFT.css";
import { BackendURL } from "../../config";
import { getAuthToken } from "../../AuthService";
import axios from "axios";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51NtiAILM6m3RV12v9cOZ4HTGsvYf0Gtkahx3NQmmWxWmLbXUmM5ouWPFWQhwvxDyHqv6E6SQ3OK0tD2Z7fg8B2RF00fXAhs8FR");

export default function BuyNFT() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads

    const token = getAuthToken(); // Retrieve the JWT token from the cookie
    if (!token)    navigate('/signin');
    if(token == '') navigate('/signin');

    axios.post(BackendURL+'/nfts/buy',{token})
      .then((res) => {
        console.log(res)
        setClientSecret(res.data.clientSecret)
      })
  }, []);

  const appearance = {
    theme: 'light',
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}