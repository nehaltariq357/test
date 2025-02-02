"use client";
import Link from "next/link";
import { useState } from "react";
import { client } from "@/sanity/lib/client";
import { useAppSelector } from "../../redux/store/slice/hooks";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Success() {
  const [orderCreated, setOrderCreated] = useState(false);
  // Form state variables
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  const cartItems = useAppSelector((state) => state.cart.items);

  // This function is now triggered on form submission.
  const handleSubmit = async (event) => {
    event.preventDefault();

    // You can perform validation here if necessary.
    if (!customerName || !customerEmail || !customerAddress) {
      toast.error("Please fill out all required fields.");
      return;
    }

    try {
      // Build your order data object, including form values
      const orderData = {
        _type: "order",
        customer: {
          name: customerName,
          email: customerEmail,
          address: customerAddress,
        },
        products: cartItems.map((item) => ({
          product: { _type: "reference", _ref: item.id },
          quantity: item.quantity,
        })),
        totalAmount: cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
        paymentStatus: "success",
        createdAt: new Date().toISOString(),
      };

      console.log("Sending order to Sanity:", orderData); // Debugging

      const response = await client.create(orderData);
      console.log("Order created in Sanity:", response);

      setOrderCreated(true);
      toast.success("Order created successfully!");
    } catch (error) {
      console.error("Error creating order in Sanity:", error);
      toast.error("Failed to create order. Please try again.");
    }
  };

  return (
    <main className="px-4 sm:px-6 lg:px-20 min-h-screen bg-gray-50 text-black flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-green-600 mb-6">
        Payment Successful!
      </h1>
      <p className="text-gray-700 text-lg mb-8">
        Thank you for your purchase. Please fill out the form below to complete your order.
      </p>

      {/* Only show the form if the order hasn't been created yet */}
      {!orderCreated ? (
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              id="address"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-customGreen text-white font-medium rounded-md hover:bg-green-500 transition duration-200"
          >
            Submit Order
          </button>
        </form>
      ) : (
        // Optionally show a confirmation message or additional actions when the order is created.
        <div className="text-center">
          <p className="text-xl font-semibold mb-4">Your order has been successfully processed!</p>
          <Link href="/">
            <button className="px-6 py-3 bg-customGreen text-white font-medium rounded-md hover:bg-green-500 transition duration-200">
              Go to Home
            </button>
          </Link>
        </div>
      )}
      <ToastContainer />
    </main>
  );
}

//completed project 
