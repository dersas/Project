import { Link } from "react-router-dom";
import CurrencySelector from "./CurrencySelector";
import CartWidget from "./CartWidget";
import { useState } from "react";
import "./index.css";

interface HeaderProps {
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  selectedCurrency,
  onCurrencyChange,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header style={{ borderBottom: "white 2px solid" }}>
      <h1 style={{ textAlign: "center" }}>An Open Page</h1>
      <div className="header">
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>
        <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
          <ul style={{ display: "flex", justifyContent: "space-around" }}>
            <li>
              <Link to={"/"} onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to={"/products"} onClick={toggleMenu}>
                Books
              </Link>
            </li>
            <li>
              <Link to={"/about"} onClick={toggleMenu}>
                About
              </Link>
            </li>
          </ul>
        </nav>
        <Link to={"/cart"}>
          <CartWidget />
        </Link>
        <CurrencySelector
          selectedCurrency={selectedCurrency}
          onCurrencyChange={onCurrencyChange}
        />
      </div>
    </header>
  );
};

export default Header;
