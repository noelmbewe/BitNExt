import { useState } from "react";
import toast from "react-hot-toast";
import Logo from "@/components/Layout/Header/Logo"; // Adjust import as necessary

// Define the type for formData
interface FormData {
  transactionType: string;
  sellCurrency: string;
  buyCurrency: string;
  price: string;
  amount: string;
  minLimit: string;
  maxLimit: string;
  paymentMethods: string[];
  paymentDetails: string;
  escrow: boolean;
  description: string;
}

const BuyCrypto = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    transactionType: "buy",
    sellCurrency: "USD",
    buyCurrency: "MWK",
    price: "",
    amount: "",
    minLimit: "",
    maxLimit: "",
    paymentMethods: [],
    paymentDetails: "",
    escrow: true,
    description: "",
  });

  const currencies = ["USD", "MWK", "BTC", "ETH"];
  const paymentMethodsOptions = ["bank-transfer", "m-pesa", "paypal"];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handlePaymentMethodsChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setFormData((prevData) => ({
      ...prevData,
      paymentMethods: selectedOptions,
    }));
  };

  const totalCost = formData.price && formData.amount
    ? (parseFloat(formData.price) * parseFloat(formData.amount)).toFixed(2)
    : "0.00";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Basic validation
    if (
      !formData.transactionType ||
      !formData.sellCurrency ||
      !formData.buyCurrency ||
      !formData.price ||
      !formData.amount ||
      !formData.minLimit ||
      !formData.maxLimit ||
      formData.paymentMethods.length === 0 ||
      !formData.paymentDetails ||
      !formData.description
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }
    if (formData.sellCurrency === formData.buyCurrency) {
      toast.error("Sell and buy currencies must be different.");
      return;
    }
    if (parseFloat(formData.minLimit) > parseFloat(formData.maxLimit)) {
      toast.error("Minimum limit cannot exceed maximum limit.");
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      toast.success("Trade offer created successfully!");
      setFormData({
        transactionType: "buy",
        sellCurrency: "USD",
        buyCurrency: "MWK",
        price: "",
        amount: "",
        minLimit: "",
        maxLimit: "",
        paymentMethods: [],
        paymentDetails: "",
        escrow: true,
        description: "",
      });
    } catch (error) {
      toast.error("An error occurred while creating the trade offer.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex justify-center mb-6">
        <Logo />
      </div>
      <div className="bg-dark_grey rounded-lg p-6 shadow-lg max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-dark_border">
        <h2 className="text-white text-xl font-semibold mb-4">Create Trade Offer</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="transaction-type" className="block text-white mb-2">
              Transaction Type
            </label>
            <select
              id="transaction-type"
              name="transactionType"
              className="text-white bg-transparent border border-dark_border border-opacity-60 rounded-md px-3 py-2 w-full focus:border-primary focus-visible:outline-0"
              value={formData.transactionType}
              onChange={handleChange}
              required
            >
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="sell-currency" className="block text-white mb-2">
              Sell Currency
            </label>
            <select
              id="sell-currency"
              name="sellCurrency"
              className="text-white bg-transparent border border-dark_border border-opacity-60 rounded-md px-3 py-2 w-full focus:border-primary focus-visible:outline-0"
              value={formData.sellCurrency}
              onChange={handleChange}
              required
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="buy-currency" className="block text-white mb-2">
              Buy Currency
            </label>
            <select
              id="buy-currency"
              name="buyCurrency"
              className="text-white bg-transparent border border-dark_border border-opacity-60 rounded-md px-3 py-2 w-full focus:border-primary focus-visible:outline-0"
              value={formData.buyCurrency}
              onChange={handleChange}
              required
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-white mb-2">
              Price per Unit
            </label>
            <input
              type="number"
              id="price"
              name="price"
              className="text-white bg-transparent border border-dark_border border-opacity-60 rounded-md px-3 py-2 w-full focus:border-primary focus-visible:outline-0"
              placeholder="e.g., 1750 MWK/USD"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-white mb-2">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              className="text-white bg-transparent border border-dark_border border-opacity-60 rounded-md px-3 py-2 w-full focus:border-primary focus-visible:outline-0"
              placeholder="e.g., 100 USD"
              value={formData.amount}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="min-limit" className="block text-white mb-2">
              Minimum Limit
            </label>
            <input
              type="number"
              id="min-limit"
              name="minLimit"
              className="text-white bg-transparent border border-dark_border border-opacity-60 rounded-md px-3 py-2 w-full focus:border-primary focus-visible:outline-0"
              value={formData.minLimit}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="max-limit" className="block text-white mb-2">
              Maximum Limit
            </label>
            <input
              type="number"
              id="max-limit"
              name="maxLimit"
              className="text-white bg-transparent border border-dark_border border-opacity-60 rounded-md px-3 py-2 w-full focus:border-primary focus-visible:outline-0"
              value={formData.maxLimit}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="payment-methods" className="block text-white mb-2">
              Payment Methods
            </label>
            <select
              id="payment-methods"
              name="paymentMethods"
              className="text-white bg-transparent border border-dark_border border-opacity-60 rounded-md px-3 py-2 w-full focus:border-primary focus-visible:outline-0"
              multiple
              value={formData.paymentMethods}
              onChange={handlePaymentMethodsChange}
              required
            >
              {paymentMethodsOptions.map((method) => (
                <option key={method} value={method}>
                  {method.charAt(0).toUpperCase() +
                    method.slice(1).replace("-", " ")}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="payment-details" className="block text-white mb-2">
              Payment Details
            </label>
            <textarea
              id="payment-details"
              name="paymentDetails"
              className="text-white bg-transparent border border-dark_border border-opacity-60 rounded-md px-3 py-2 w-full focus:border-primary focus-visible:outline-0"
              placeholder="e.g., Bank name, account number"
              value={formData.paymentDetails}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="escrow"
              name="escrow"
              className="mr-2"
              checked={formData.escrow}
              onChange={handleChange}
            />
            <label htmlFor="escrow" className="text-white">
              Enable Escrow
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-white mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="text-white bg-transparent border border-dark_border border-opacity-60 rounded-md px-3 py-2 w-full focus:border-primary focus-visible:outline-0"
              placeholder="Trade terms"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="flex justify-between mb-4 text-white">
            <p>Total Cost: </p>
            <p>${totalCost}</p>
          </div>
          <button
            type="submit"
            className="text-darkmode font-medium text-18 bg-primary w-full border border-primary rounded-lg py-3 hover:text-primary hover:bg-transparent"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Trade"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BuyCrypto;