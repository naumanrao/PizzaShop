import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";

const SingleProduct = () => {
  const [product, setProduct] = useState({});
  const { cart, setCart } = useContext(CartContext);
  const params = useParams();
  const history = useNavigate();
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetch(
      `https://liveapi-production-d720.up.railway.app/api/products/${params._id}`
    )
      .then((res) => res.json())
      .then((product) => {
        setProduct(product);
      });
  }, [params._id]);

  const addToCart = (e) => {
    e.preventDefault();
    let _cart = { ...cart };
    if (!_cart.items) {
      _cart.items = {};
    }
    if (_cart.items[params._id]) {
      _cart.items[params._id] += 1;
    } else {
      _cart.items[params._id] = 1;
    }
    if (!_cart.totalItems) {
      _cart.totalItems = 0;
    }
    _cart.totalItems += 1;
    setCart(_cart);
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto mt-12">
      <button
        className="mb-12 font-bold"
        onClick={() => {
          history(-1);
        }}
      >
        Back
      </button>
      <div className="flex">
        <img src={product.image} alt="pizza" />
        <div className="ml-16">
          <h1 className="text-xl font-bold">{product.name}</h1>
          <div className="text-md">{product.size}</div>
          <div className="font-bold mt-2">{product.price}</div>
          <button
            disabled={isAdding}
            onClick={(e) => addToCart(e, params)}
            className={`${
              isAdding
                ? "bg-green-500 py-1 px-8 rounded-full font-bold mt-4"
                : "bg-yellow-500 py-1 px-8 rounded-full font-bold mt-4"
            }`}
          >
            {`${isAdding ? "Added To Cart" : "Add To Cart"} `}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
