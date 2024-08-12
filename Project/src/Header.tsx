import { Link } from "react-router-dom";
import CurrencySelector from "./CurrencySelector";
import CartWidget from "./CartWidget";

interface HeaderProps {
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  selectedCurrency,
  onCurrencyChange,
}) => {
  return (
    <header style={{ borderBottom: "white 2px solid" }}>
      <h1 style={{ textAlign: "center" }}>An Open Page</h1>
      <ul style={{ display: "flex", justifyContent: "space-around" }}>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/products"}>All Books</Link>
        </li>
        <li>
          <Link to={"/about"}>About</Link>
        </li>
        <li>
          <Link to={"/cart"}>
            <CartWidget />
          </Link>
        </li>
      </ul>
      <CurrencySelector
        selectedCurrency={selectedCurrency}
        onCurrencyChange={onCurrencyChange}
      />
    </header>
  );
};

export default Header;
