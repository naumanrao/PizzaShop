import React, { useEffect, useState } from "react";
import Product from "../components/Product";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://liveapi-production-d720.up.railway.app/api/products")
      .then((response) => {
        return response.json();
      })
      .then((products) => {
        setProducts(products);
      });
  }, []);

  return (
    <div className="container mx-auto pb-24">
      <h1 className="text-lg font-bold my-8">Products</h1>
      <div className="grid grid-cols-5 my-8 gap-24">
        {products.map((item) => {
          console.log(item.image);
          return (
            <Product
              id={item._id}
              key={item._id}
              name={item.name}
              image={item.image}
              size={item.size}
              price={item.price}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Products;
