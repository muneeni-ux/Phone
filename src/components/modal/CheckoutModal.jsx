import React from "react";
import {useState} from "react";
import { CheckCircle, CreditCard, Smartphone, DollarSign, MapPin, X } from "lucide-react";



const paymentOptions = [
    { id: 'mobile_money', name: 'M-Pesa / Mobile Money', icon: <Smartphone size={20} />, details: 'Instant payment via local mobile platforms.' },
    { id: 'credit_card', name: 'Credit / Debit Card', icon: <CreditCard size={20} />, details: 'Secure payment via Visa, Mastercard.' },
    { id: 'cash_on_delivery', name: 'Cash on Delivery (Local)', icon: <DollarSign size={20} />, details: 'Payment upon delivery (within Nairobi only).' },
];

const CheckoutModal = ({ grandTotal, closeModal, showToast }) => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    phone: "",
    street: "",
    city: "Nairobi",
    country: "Kenya",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateForm = () => {
    const errors = {};
    if (!shippingDetails.name.trim()) errors.name = "Full name is required.";
    if (!shippingDetails.phone.trim())
      errors.phone = "Phone number is required.";
    if (!shippingDetails.street.trim())
      errors.street = "Street/Area is required.";
    if (!selectedPayment) errors.payment = "Please select a payment method.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
// Utility to format price
const formatPrice = (price) => `Ksh ${price.toLocaleString()}`;

  const handleFinalizeOrder = () => {
    if (!validateForm()) {
      showToast("Please complete all required fields.", "error");
      return;
    }

    // MOCK CHECKOUT SUCCESS
    showToast(
      `Order confirmed! Payment of ${formatPrice(
        grandTotal
      )} initiated via ${selectedPayment}.`,
      "success"
    );
    console.log("--- FINAL ORDER SUBMITTED ---");
    console.log(`Payment Method: ${selectedPayment}`);
    console.log("Shipping To:", shippingDetails);

    setTimeout(closeModal, 1500); // Close modal after successful fake payment initiation
    // In a real app, this would initiate a payment API call
  };

  // Reusable Payment Option Component for Modal
  const PaymentOption = ({ option }) => (
    <label
      htmlFor={option.id}
      className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
        selectedPayment === option.id
          ? "border-blue-600 bg-blue-50 shadow-md"
          : "border-gray-200 bg-white hover:border-blue-300"
      }`}
    >
      <div className="flex items-center gap-3">
        <input
          type="radio"
          id={option.id}
          name="payment"
          value={option.id}
          checked={selectedPayment === option.id}
          onChange={() => {
            setSelectedPayment(option.id);
            setFormErrors((prev) => ({ ...prev, payment: undefined }));
          }}
          className="hidden"
        />
        <div
          className={`p-2 rounded-full ${
            selectedPayment === option.id
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {option.icon}
        </div>
        <div>
          <span className="font-bold text-gray-900">{option.name}</span>
          <p className="text-xs text-gray-500 mt-0.5">{option.details}</p>
        </div>
      </div>
      {selectedPayment === option.id && (
        <CheckCircle size={20} className="text-blue-600 flex-shrink-0" />
      )}
    </label>
  );

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl transition-all duration-300 transform scale-100 relative">
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10 rounded-t-3xl flex justify-between items-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Finalize Order
          </h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-900 p-2 rounded-full transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body: Two Columns */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Column 1: Shipping Form */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 border-b pb-2">
              <MapPin size={20} className="text-blue-600" /> 1. Delivery Details
            </h3>
            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={shippingDetails.name}
                  onChange={handleShippingChange}
                  placeholder="John Doe"
                  className={`w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                    formErrors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={shippingDetails.phone}
                  onChange={handleShippingChange}
                  placeholder="+254 7XX XXX XXX"
                  className={`w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                    formErrors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.phone}
                  </p>
                )}
              </div>

              {/* Street/Area */}
              <div>
                <label
                  htmlFor="street"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Street Address / Area Name *
                </label>
                <input
                  type="text"
                  name="street"
                  value={shippingDetails.street}
                  onChange={handleShippingChange}
                  placeholder="Apartment 4B, XYZ Road"
                  className={`w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                    formErrors.street ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {formErrors.street && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.street}
                  </p>
                )}
              </div>

              {/* City/Country */}
              <div className="flex gap-4">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    City / Town
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={shippingDetails.city}
                    disabled
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={shippingDetails.country}
                    disabled
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Payment Options & Total */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 border-b pb-2">
              <CreditCard size={20} className="text-blue-600" /> 2. Payment
              Method
            </h3>
            <div className="space-y-4">
              {paymentOptions.map((option) => (
                <PaymentOption key={option.id} option={option} />
              ))}
            </div>
            {formErrors.payment && (
              <p className="text-red-500 text-sm mt-3 font-medium">
                {formErrors.payment}
              </p>
            )}

            {/* Final Total Display */}
            <div className="mt-8 pt-4 border-t-2 border-blue-100">
              <div className="flex justify-between text-xl font-extrabold">
                <span>Total to Pay:</span>
                <span className="text-blue-600 text-3xl">
                  {formatPrice(grandTotal)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer (Action Button) */}
        <div className="p-6 border-t border-gray-200 sticky bottom-0 bg-white rounded-b-3xl">
          <button
            onClick={handleFinalizeOrder}
            className={`w-full block text-center py-3 text-xl font-bold rounded-xl shadow-lg transition duration-300 transform 
                            ${
                              selectedPayment
                                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30 hover:scale-[1.01]"
                                : "bg-gray-300 text-gray-600 cursor-not-allowed"
                            }`}
          >
            Place Order and Pay{" "}
            {selectedPayment
              ? `via ${
                  paymentOptions
                    .find((o) => o.id === selectedPayment)
                    .name.split(" ")[0]
                }`
              : ""}
          </button>
        </div>
      </div>
    </div>
  );
};
export default CheckoutModal;
