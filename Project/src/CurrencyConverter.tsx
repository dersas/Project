import React, { useState } from "react";

interface CurrencyConverterProps {
  price: number;
  currency: string;
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({
  price,
  currency,
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState<string>("EUR");

  const getCurrencySymbol = (currency: string): string => {
    switch (currency) {
      case "EUR":
        return "€";
      case "USD":
        return "$";
      case "GBP":
        return "£";
      default:
        return "";
    }
  };

  const getCurrencyRate = (currency: string): number => {
    switch (currency) {
      case "EUR":
        return 1;
      case "USD":
        return 1.09;
      case "GBP":
        return 0.86;
      default:
        return 1;
    }
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(e.target.value);
  };

  return (
    <div>
      <span>
        {getCurrencySymbol(selectedCurrency)}
        {(price * getCurrencyRate(selectedCurrency)).toFixed(2)}
      </span>
      <select value={selectedCurrency} onChange={handleCurrencyChange}>
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="GBP">GBP</option>
      </select>
    </div>
  );
};

export default CurrencyConverter;
