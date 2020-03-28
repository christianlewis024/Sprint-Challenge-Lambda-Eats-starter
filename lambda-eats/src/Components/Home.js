import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Lambda Consumes All</h1>
      <h2>Order a pizza my friend.</h2>
      <img
        className="pizzahut"
        src="https://vignette.wikia.nocookie.net/spaceballs/images/c/c4/Pizza_the_Hutt.jpg/revision/latest/scale-to-width-down/340?cb=20181205062614"
        alt="pizzathehut"
      />

      <Link className="flexin" to={"/form"}>
        <br></br>
        <br></br>
        <div className="order-here">Place Orders Here!! </div>
      </Link>
    </div>
  );
};

export default Home;
