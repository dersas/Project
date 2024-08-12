import { useEffect, useMemo, useState } from "react";
import { Product } from "./typing";
import CurrencyConverter from "./CurrencyConverter";
import React from "react";
import { useCart } from "./CartContext";

interface ProductListProps {
  products: Product[];
  selectedCurrency: string;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  selectedCurrency,
}) => {
  const [dataList, setDataList] = useState<Product[]>([]);
  const { addToCart } = useCart();

  const randomBooks = useMemo(() => {
    const randomList = [...products].sort(() => 0.5 - Math.random());
    return randomList.slice(0, 12);
  }, [dataList]);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data: Product[]) => {
        setDataList(data);
        console.log(data);
      });
  }, []);

  return (
    <div>
      <div className="book-grid">
        {randomBooks.map((data) => (
          <div
            key={data._id}
            style={{ width: "200px" }}
            className="product-item"
          >
            <h3 style={{ fontSize: "15px" }}>{data.title}</h3>
            <h4 style={{ fontSize: "13px" }}>{data.author}</h4>
            <img
              src={data.cover_image}
              alt={data.title}
              style={{ width: "auto", height: "7rem" }}
            />
            <p style={{ fontSize: "8px", fontStyle: "italic" }}>
              Description: {data.description}{" "}
            </p>
            <CurrencyConverter
              price={data.price}
              currency="EUR"
              selectedCurrency={selectedCurrency}
            />
            <button onClick={() => addToCart(data)}>Buy</button>
          </div>
        ))}
      </div>
      <h2 className="section-title">Why not try some Fantasy?</h2>
      <div className="book-grid">
        {products
          .filter((data) =>
            data.genre.some((g) => g.toLowerCase() === "fantasy")
          )
          .slice(0, 4)
          .map((data) => (
            <div
              key={data._id}
              style={{ width: "200px" }}
              className="product-item"
            >
              <h3 style={{ fontSize: "15px" }}>{data.title}</h3>
              <h4 style={{ fontSize: "13px" }}>{data.author}</h4>
              <img
                src={data.cover_image}
                alt={data.title}
                style={{ width: "auto", height: "7rem" }}
              />

              <p style={{ fontSize: "8px", fontStyle: "italic" }}>
                Description: {data.description}{" "}
              </p>

              <CurrencyConverter
                price={data.price}
                currency="EUR"
                selectedCurrency={selectedCurrency}
              />
              <button onClick={() => addToCart(data)}>Buy</button>
            </div>
          ))}
      </div>
      <h2 className="section-title">The classics</h2>
      <div className="book-grid">
        {products
          .filter((data) =>
            data.genre.some((g) => g.toLowerCase() === "classic")
          )
          .slice(0, 4)
          .map((data) => (
            <div
              key={data._id}
              style={{ width: "200px" }}
              className="product-item"
            >
              <h3 style={{ fontSize: "15px" }}>{data.title}</h3>
              <h4 style={{ fontSize: "13px" }}>{data.author}</h4>
              <img
                src={data.cover_image}
                alt={data.title}
                style={{ width: "auto", height: "7rem" }}
              />

              <p style={{ fontSize: "8px", fontStyle: "italic" }}>
                Description: {data.description}{" "}
              </p>
              <CurrencyConverter
                price={data.price}
                currency="EUR"
                selectedCurrency={selectedCurrency}
              />
              <button onClick={() => addToCart(data)}>Buy</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductList;
