import React, { useEffect, useState } from "react";
import logo from "../src/logo.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const [products, setproducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState("");
  const [price, setPrice] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setproducts(data.products);
        const uniquecategories = [
          ...new Set(data.products.map((products) => products.category)),
        ];
        setCategories(uniquecategories);
      })
      .catch((error) => console.log("error", error.message));
  }, []);

  useEffect(() => {
    if (selected && price) {
      const result = products.filter(
        (products) =>
          products.category === selected && products.price > parseFloat(price)
      );
      setFiltered(result);
    } else {
      setFiltered([]);
    }
  }, [selected, price, products]);

  const handleclick = (productTitle) => {
    toast.success(`Successfully purchased ${productTitle}`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
    });
  };

  return (
    <div className="w-full h-screen ">
      <div className="flex justify-between items-center bg-white text-red-500  p-4 shadow-lg shadow-red-200">
        <img src={logo} className="mx-5 w-22 h-22" alt="" />
        <div className=" flex gap-5 mx-10">
          <input
            type="number"
            placeholder="enter a price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="py-1 px-2 rounded-md bg-red-500 text-white"
          />
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className=" py-1 px-4  rounded-md bg-red-500 text-white"
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="p-6  mt-6">
        {filtered.length > 0 ? (
          <ul className="flex flex-col  gap-5">
            {filtered.map((products) => (
              <li
                key={products.id}
                onClick={() => handleclick(products.title)}
                className="border border-gray-200 p-4 rounded-lg shadow-md bg-white hover:bg-red-500 hover:text-white"
              >
                <h2>{products.title}</h2>
                <p>{products.price}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex h-96  justify-center items-center">
          <p className="flex justify-center items-center rounded-lg bg-red-500 text-white px-4 py-1">No Products Found</p>
       </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Form;
