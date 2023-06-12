import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../CartContext";

function Navigation() {
  const cartStyle = {
    background: "#F59E0D",
    border: "1px solid #F59E0D",
    borderRadius: "30px",
    padding: "0px 5px 0px 5px",
  };

  const { cart } = useContext(CartContext);

  return (
    <>
      <nav className="container mx-auto flex justify-between items-center py-4">
        <Link to="/">
          <img style={{ height: 45 }} src="/images/logo.png" alt="logo" />
        </Link>
        <ul className="flex gap-10">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li style={cartStyle}>
            <Link to="/cart">
              <div className="flex gap-1 items-center">
                <span>{cart.totalItems ? cart.totalItems : 0}</span>
                <img src="/images/cart.png" alt="cart-icon" />
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navigation;
