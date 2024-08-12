import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { Product } from "./typing";
import CurrencyConverter from "./CurrencyConverter";
import { useCart } from "./CartContext";

const Products: React.FC = () => {
  const [dataList, setDataList] = useState<Product[]>([]);
  const [sortType, setSortType] = useState<"price" | "name">("price");
  const [sortOption, setSortOption] = useState<"asc" | "desc">("asc");
  const { addToCart } = useCart();
  const [selectedCurrency, setSelectedCurrency] = useState<string>("EUR");

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
  };

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data: Product[]) => {
        setDataList(data);
        console.log(data);
      });
  }, []);

  const handleSortOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const [newSortType, newSortOption] = event.target.value.split("-") as [
      "price" | "name",
      "asc" | "desc"
    ];
    setSortType(newSortType);
    setSortOption(newSortOption);
    sortProducts(newSortType, newSortOption);
  };

  const sortProducts = (type: "price" | "name", order: "asc" | "desc") => {
    setDataList((prevDataList) => {
      return [...prevDataList].sort((a, b) => {
        if (type === "price") {
          return order === "asc" ? a.price - b.price : b.price - a.price;
        } else {
          return order === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        }
      });
    });
  };

  return (
    <div>
      <Header
        selectedCurrency={selectedCurrency}
        onCurrencyChange={handleCurrencyChange}
      />
      <main>
        <h3>All Books available</h3>
        <label htmlFor="sort-select">Sort by Price: </label>
        <select
          id="sort-select"
          value={sortOption}
          onChange={handleSortOptionChange}
        >
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>

        <div className="book-grid">
          {dataList.map((data) => (
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
              <p style={{ fontSize: "8px" }}>
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
      </main>
      <Footer />
    </div>
  );
};

export default Products;
