import Footer from "../Footer";
import Header from "../Header";
import ProductList from "../ProductList";
import SearchBar from "../SearchBar";

function Root() {
  return (
    <div>
      <Header />
      <main>
        <SearchBar />

        <div className="product-container">
          <ProductList />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Root;
