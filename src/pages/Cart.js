import { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext";

function Cart() {
  let total = 0;

  const [priceFetched, togglePriceFetched] = useState(false);
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    if (!cart.items) {
      return;
    }

    if (priceFetched) {
      return;
    }
    fetch(
      "https://liveapi-production-d720.up.railway.app/api/products/cart-items",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: Object.keys(cart.items) }),
      }
    )
      .then((res) => res.json())
      .then((products) => {
        setProducts(products);
        togglePriceFetched(true);
      });
  }, [cart, priceFetched]);

  const getQty = (productId) => {
    return cart.items[productId];
  };

  const increament = (productId) => {
    const oldQty = cart.items[productId];

    const _cart = { ...cart };
    _cart.items[productId] = oldQty + 1;

    _cart.totalItems += 1;
    setCart(_cart);
  };

  const decreament = (productId) => {
    const oldQty = cart.items[productId];
    if (oldQty === 1) {
      return;
    }
    const _cart = { ...cart };

    _cart.items[productId] = oldQty - 1;

    _cart.totalItems -= 1;

    setCart(_cart);
  };

  const getSum = (productId, price) => {
    const sum = price * getQty(productId);

    total += sum;
    return sum;
  };

  const remove = (productId) => {
    const _cart = { ...cart };
    const qty = cart.items[productId];
    delete cart.items[productId];
    _cart.totalItems -= qty;
    setCart(_cart);
    setProducts(products.filter((product) => product._id !== productId));
  };

  return (
    <div className="container mx-auto lg:w-1/2 w-full pb-24">
      <h1 className="my-12 font-bold">Cart Items</h1>
      <ul>
        {products.map((products) => {
          return (
            <li className="mb-12" key={products._id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img className="h-16" src={products.image} alt="pizza" />
                  <span className="font-bold ml-4 w-48">{products.name}</span>
                </div>
                <div>
                  <button
                    onClick={() => {
                      decreament(products._id);
                    }}
                    className="bg-yellow-500 px-4 py-2 rounded-full leading-none"
                  >
                    -
                  </button>
                  <b className="px-4">{getQty(products._id)}</b>
                  <button
                    onClick={() => {
                      increament(products._id);
                    }}
                    className="bg-yellow-500 px-4 py-2 rounded-full leading-none"
                  >
                    +
                  </button>
                </div>
                <span>Rs {getSum(products._id, products.price)}</span>
                <button
                  onClick={() => {
                    remove(products._id);
                  }}
                  className="bg-red-500 px-4 py-2 rounded-full leading-none text-white"
                >
                  Remove
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <hr className="my-6" />
      <div className="text-right">
        <b>Grand Total:</b>Rs {total}
      </div>
      <div className="text-right mt-6">
        <button className="bg-yellow-500 px-4 py-2 rounded-full leading-none">
          Order Now
        </button>
      </div>
    </div>
  );
}

export default Cart;
