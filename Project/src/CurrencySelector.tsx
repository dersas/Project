import React from "react";

interface CurrencySelectorProps {
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  selectedCurrency,
  onCurrencyChange,
}) => {
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onCurrencyChange(e.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "right",
        margin: "5px 10px",
      }}
    >
      <select
        value={selectedCurrency}
        onChange={handleCurrencyChange}
        style={{
          width: "3.5rem",
          height: "2rem",
        }}
      >
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="GBP">GBP</option>
      </select>
    </div>
  );
};

export default CurrencySelector;
