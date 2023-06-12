import Products from "./Products";
import "./style.css";

function Home() {
  return (
    <>
      <div className="hero py-16">
        <div className="container mx-auto flex items-center flex-start ">
          <div className="w-1/2">
            <h6 className="text-lg">
              <em> Bhook Lagi Hai?</em>
            </h6>
            <h1 className="text-3xl md:text-6xl font-bold">PIZZA KHA LOO!</h1>
            <button className="px-6 py-2 rounded-full text white font-bold mt-4 bg-yellow-500 hover:bg-yellow-600">
              Order Now
            </button>
          </div>
          <div>
            <img className="image" src="/images/pizza1.png" alt="pizza" />
          </div>
        </div>
      </div>
      <div className="pb-24">
        <Products />
      </div>
    </>
  );
}

export default Home;
