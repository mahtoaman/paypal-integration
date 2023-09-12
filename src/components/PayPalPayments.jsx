import { PayPalButtons } from "@paypal/react-paypal-js";
import React from "react";

export default function PayPalPayments() {
  const createOrder = (data, actions) => {
    const serverUrl = "http://localhost:8888";
    return fetch(`${serverUrl}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: {
          description: "Wood Candy Sofa",
          cost: "399.00",
        },
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id);
  };

  const onApprove = (data, actions) => {
    const serverUrl = "http://localhost:8888";
    return fetch(`${serverUrl}api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    }).then((response) => response.json());
  };

  return (
    <PayPalButtons
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  );
}
