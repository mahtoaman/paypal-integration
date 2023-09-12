import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const productData = [
  {
    name: "Product 1",
    price: 1972.00,
    description: "Description for Product 1",
  },
  {
    name: "Product 2",
    price: 2127.00,
    description: "Description for Product 2",
  },
  // Add more products here...
];

function ProductList() {
  const paypalOptions = {
    clientId:
      "ARRqbjmvHpeyDcGF7KikCWfpl8hrsqzEq3ZbEDAY-psPjTFDb34KmOR7mR66EzCR3iSjEgFTCdwUFWuV",
    currency: "USD",
    intent: "capture",
    mode: "sandbox",
  };

  const handlePaymentSuccess = (details) => {
    // Handle successful payment (e.g., update order status)
    console.log("Payment successful:", details);
  };

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <div className="product-list">
        {productData.map((product, index) => (
          <div key={index} className="product-item">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: product.price.toFixed(2), // Ensure 2 decimal places
                      },
                      description: product.description,
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then(function (details) {
                  // Handle the successful payment here
                  handlePaymentSuccess(details);
                });
              }}
            />
          </div>
        ))}
      </div>
    </PayPalScriptProvider>
  );
}

export default ProductList;
