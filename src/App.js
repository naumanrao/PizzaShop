// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Navigation from "./components/Navigation";
import Cart from "./pages/Cart";
import SingleProduct from "./pages/SingleProduct";
import { CartContext } from "./CartContext";
import { useEffect, useState } from "react";

function App() {
  const [cart, setCart] = useState({});

  useEffect(() => {
    const cart = window.localStorage.getItem("cart");

    setCart(JSON.parse(cart));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <CartContext.Provider value={{ cart, setCart }}>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} exact></Route>
            <Route path="/products" element={<Products />}></Route>
            <Route
              path="/products/:_id"
              exact
              element={<SingleProduct />}
            ></Route>
            <Route path="/cart" element={<Cart />}></Route>
          </Routes>
        </Router>
      </CartContext.Provider>
    </>
  );
}

export default App;
