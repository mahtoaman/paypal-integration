import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


const productData = [
  {
    name: "Product 1",
    price: 0.01,
    description: "Description for Product 1",
  },
  {
    name: "Product 2",
    price: 2127.0,
    description: "Description for Product 2",
  },
  // Add more products here...
];

function App() {
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);

  const paypalOptions = {
    clientId:
      "AUkQGiMiYLlGTZRRLmIOgEEfQRoxCUMVax7a-vSw4QJ6BYf1CfcXlymUbdseyusE2RNM5lJjQmCHez5-",
    currency: "USD",
    intent: "capture",
  };

  const handlePaymentSuccess = (details) => {
    // Handle successful payment (e.g., update order status)
    console.log("Payment successful:", details);
     
  };

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <div className="flex p-5 product-list space-x-5 bg-red-300">
        {productData.map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-lg product-item shadow-lg shadow-black w-fit"
          >
            <h3 className="text-lg font-serif font-bold text-center">
              {product.name}
            </h3>
            <p className="text-center text-green-400 p-2">
              {product.description}
            </p>
            <span>{product.price}$</span>
            <div className="flex items-center justify-center m-5">
              <button
                className="px-5 py-1 bg-blue-500 text-white rounded-lg"
                onClick={() => setSelectedProductIndex(index)}
              >
                Pay
              </button>
            </div>
            {selectedProductIndex === index && (
              <PayPalButtons
                style={{
                  layout: "vertical",
                  color: "gold",
                  shape: "rect",
                  label: "pay",
                  tagline: false,
                }}
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
            )}
          </div>
        ))}
      </div>
    </PayPalScriptProvider>
  );
}

export default App;
