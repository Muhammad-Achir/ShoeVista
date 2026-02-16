import axios from "axios";
import React, { useEffect, useState } from "react";
import HorSlider from "./HorSlider";

const ShopBy = ({ filter, title }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const data = [
    {
      _id: "adidas",
      img: "/GenInfo/adidas.jpg",
      title: "Adidas Collection",
      sellPrice: 110,
      mrp: 10,
      discount: 20,
      brand: "Adidas",
      category: "women",
      rating: 4.5,
    },
    {
      _id: "nike",
      img: "/GenInfo/nike.png",
      title: "Nike Collection",
      sellPrice: 220,
      mrp: 30,
      discount: 40,
      brand: "Nike",
      category: "men",
      rating: 4.5,
    },
    {
      _id: "skechers",
      img: "/GenInfo/skechers.jpg",
      title: "Skechers Collection",
      sellPrice: 550,
      mrp: 0,
      discount: 0,
      brand: "Skechers",
      category: "child",
      rating: 4.5,
    },
    {
      _id: "puma",
      img: "/GenInfo/puma.jpg",
      title: "Puma Collection",
      sellPrice: 770,
      mrp: 0,
      discount: 0,
      brand: "Puma",
      category: "unisex",
      rating: 4.5,
    },
  ];

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/filter/${filter}`
        );
        if (isMounted) {
          if (filter === "bestSellers") {
            setProducts(data);
          } else {
            setProducts(res.data);
          }
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error(`Error while fetching products: ${err.message}`);
          setError(err);
          setLoading(false);
        }
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <div className="mt-10 mb-2 text-2xl">{title}</div>
      <div className="overflow-x-auto overflow-y-hidden md:max-w-full scroll-container mb-10 mx-auto relative scroll-container">
        {loading && <p>Loading...</p>}
        {error && <p>Error while fetching: {error.message}</p>}

        <div className="flex flex-nowrap space-x-4">
          {/* Ensure products is always an array */}
          {(Array.isArray(products) ? products : []).map((elem) => (
            <HorSlider
              product={elem}
              key={elem._id || elem.id} // fallback if _id is missing
              className="inline-block"
              home={true}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ShopBy;
