import { Link } from "react-router-dom";
import CurrencySelector from "./CurrencySelector";

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
        <li style={{ listStyle: "none" }}>
          <Link to={"/cart"}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRay0SfdAYA00zHxcHegaJME8l_83R5k1u4vQ&s"
              style={{ width: "20px" }}
            ></img>
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
