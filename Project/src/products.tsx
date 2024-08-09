import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { Product } from "./typing";
import CurrencyConverter from "./CurrencyConverter";

interface SelectedItem extends Product {
  selectedId: number;
}
const Products: React.FC = () => {
  const [dataList, setDataList] = useState<Product[]>([]);
  const [buyList, setBuyList] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState<"asc" | "desc">("asc");

  const handleSortOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortOption(event.target.value as "asc" | "desc");
    sortProducts(event.target.value as "asc" | "desc");
  };

  const sortProducts = (order: "asc" | "desc") => {
    setDataList((prevDataList) => {
      return [...prevDataList].sort((a, b) =>
        order === "asc" ? a.price - b.price : b.price - a.price
      );
    });
  };

  const addToCart = (product: Product) => {
    setBuyList((prevItem) => {
      const newSelectedItem: SelectedItem = {
        ...product,
        selectedId: Date.now(),
      };
      return [...prevItem, newSelectedItem];
    });
    console.log(buyList);
  };

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
      <Header />
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
              <CurrencyConverter price={data.price} currency={data.currency} />
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
