import Header from "../Header";
import Footer from "../Footer";
import { useEffect, useState } from "react";
import { Product } from "../typing";
import CurrencyConverter from "../CurrencyConverter";
import { useCart } from "../CartContext";
import SearchBar from "../SearchBar";

type SortOption = "default" | "priceAsc" | "priceDesc" | "nameAsc" | "nameDesc";

const Products: React.FC = () => {
  const [dataList, setDataList] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>("default");
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

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value as SortOption);
  };

  const sortedProducts = [...dataList].sort((a, b) => {
    switch (sortOption) {
      case "priceAsc":
        return a.price - b.price;
      case "priceDesc":
        return b.price - a.price;
      case "nameAsc":
        return a.title.localeCompare(b.title);
      case "nameDesc":
        return b.title.localeCompare(a.title);
      default:
        return 0; // 'default' case, no sorting
    }
  });

  return (
    <div>
      <Header
        selectedCurrency={selectedCurrency}
        onCurrencyChange={handleCurrencyChange}
      />
      <main>
        <SearchBar selectedCurrency={selectedCurrency} products={dataList} />
        <h3>All Books available</h3>
        <div className="order-bar">
          <label htmlFor="sort-select">Sort by: </label>
          <select
            id="sort-select"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="default">Default</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="nameAsc">Name: A to Z</option>
            <option value="nameDesc">Name: Z to A</option>
          </select>
        </div>

        <div className="book-grid">
          {sortedProducts.map((data) => (
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
                <b>
                  {" "}
                  <u>Description:</u>
                </b>{" "}
                {data.description}{" "}
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
