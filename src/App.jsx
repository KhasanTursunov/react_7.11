import React from "react";
import Header from "./components/Header";
import Products from "./components/products";
import Hero from "./components/Hero";


const App = () => {
  return (
    <div>
      <Header title="Header section" year={2025}/>
      <Hero/>
      <h2>Class component</h2>
      {/* <Products/> */}
    </div>
  );
};

export default App;
