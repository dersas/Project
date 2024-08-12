import React from "react";

interface CurrencyConverterProps {
  price: number;
  currency: string;
  selectedCurrency: string;
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({
  price,
  currency,
  selectedCurrency,
}) => {
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

  return (
    <span>
      {getCurrencySymbol(selectedCurrency)}
      {(price * getCurrencyRate(selectedCurrency)).toFixed(2)}
    </span>
  );
};

export default CurrencyConverter;
