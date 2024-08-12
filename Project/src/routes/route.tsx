import { useEffect, useState } from "react";
import Footer from "../Footer";
import Header from "../Header";
import ProductList from "../ProductList";
import SearchBar from "../SearchBar";
import { Product } from "../typing";

function Root() {
  const [selectedCurrency, setSelectedCurrency] = useState<string>("EUR");
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch("http://localhost:3000/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  return (
    <div>
      <Header
        selectedCurrency={selectedCurrency}
        onCurrencyChange={handleCurrencyChange}
      />
      <main>
        <SearchBar selectedCurrency={selectedCurrency} products={products} />

        <div className="product-container">
          <ProductList
            products={products}
            selectedCurrency={selectedCurrency}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Root;
