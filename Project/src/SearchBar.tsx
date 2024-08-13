import { useState, useEffect } from "react";
import { Product } from "./typing";
import { useCart } from "./CartContext";
import CurrencyConverter from "./CurrencyConverter";

interface ProductListProps {
  products: Product[];
  selectedCurrency: string;
}

const SearchBar: React.FC<ProductListProps> = ({
  products,
  selectedCurrency,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const results = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, products]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowResults(e.target.value.length > 0);
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        placeholder="Book or author"
        value={searchTerm}
        onChange={handleChange}
        style={{
          width: "35%",
          padding: "10px",
          fontSize: "16px",
        }}
      />
      {showResults && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: "10%",
            right: "10%",
            maxHeight: "400px",
            overflowY: "auto",
            backgroundColor: "darkgrey",
            border: "1px solid #ddd",
            borderTop: "none",
            zIndex: 1,
          }}
        >
          {searchResults.map((data) => (
            <div
              key={data._id}
              style={{
                padding: "10px",
                borderBottom: "1px solid #eee",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <img
                src={data.cover_image}
                alt={data.title}
                style={{
                  width: "50px",
                  height: "75px",
                  marginRight: "10px",
                  objectFit: "cover",
                }}
              />
              <div>
                <h3 style={{ margin: "0 0 5px 0", fontSize: "16px" }}>
                  {data.title}
                </h3>
                <p style={{ margin: 0, fontSize: "14px" }}>{data.author}</p>
              </div>
              <CurrencyConverter
                price={data.price}
                currency="EUR"
                selectedCurrency={selectedCurrency}
              />
              <button
                onClick={() => addToCart(data)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "lightgrey",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginLeft: "10px",
                  flexShrink: 0,
                }}
              >
                Buy
              </button>
            </div>
          ))}
          {searchResults.length === 0 && (
            <div style={{ padding: "10px" }}>No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
