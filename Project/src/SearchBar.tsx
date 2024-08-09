import { useState, useEffect } from "react";
import { Product } from "./typing";

const SearchBar: React.FC = () => {
  const [dataList, setDataList] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data: Product[]) => {
        setDataList(data);
      });
  }, []);

  useEffect(() => {
    const results = dataList.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, dataList]);

  const handleBuy = (product: Product) => {
    // Implement your buy logic here
    console.log(`Buying ${product.title}`);
    // You might want to add this product to a cart, open a modal, or navigate to a purchase page
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowResults(e.target.value.length > 0);
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        placeholder="Search books..."
        value={searchTerm}
        onChange={handleChange}
        style={{
          width: "25%",
          padding: "10px",
          fontSize: "16px",
        }}
      />
      {showResults && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: "20%",
            right: "20%",
            maxHeight: "400px",
            overflowY: "auto",
            backgroundColor: "darkgrey",
            border: "1px solid #ddd",
            borderTop: "none",
            zIndex: 1000,
          }}
        >
          {searchResults.map((product) => (
            <div
              key={product._id}
              style={{
                padding: "10px",
                borderBottom: "1px solid #eee",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <img
                src={product.cover_image}
                alt={product.title}
                style={{
                  width: "50px",
                  height: "75px",
                  marginRight: "10px",
                  objectFit: "cover",
                }}
              />
              <div>
                <h3 style={{ margin: "0 0 5px 0", fontSize: "16px" }}>
                  {product.title}
                </h3>
                <p style={{ margin: 0, fontSize: "14px" }}>{product.author}</p>
              </div>
              <p>
                Price: {product.price} {product.currency}
              </p>
              <button
                onClick={() => handleBuy(product)}
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
