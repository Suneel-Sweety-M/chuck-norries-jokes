import React, { useEffect, useState } from "react";
import "./categories.css";
import { CATEGORIES } from "./data";
import axios from "axios";

const Categories = () => {
  const [click, setClick] = useState(false);
  const [title, setTitle] = useState("");
  const [joke, setJoke] = useState("");

  const HandleClick = (e) => {
    setTitle(e);
    setClick(true);
  };

  const GetJoke =()=>{
    axios
      .request(`https://api.chucknorris.io/jokes/random`)
      .then((res) => setJoke(res.data.value));
  }

  useEffect(() => {
    GetJoke();
  }, [title]);

  return (
    <>
      <h1 className="title">Chuck Norries</h1>

      <div className="categories-box">
        {CATEGORIES.map((cat, index) => (
          <>
            <div className="box" key={index} onClick={() => HandleClick(cat)}>
              <h2>{cat}</h2>
              <p>Unlimited Jokes On {cat}</p>
            </div>
          </>
        ))}

        <div
          className="popup-box"
          style={{ display: click ? "block" : "none" }}
        >
          <h1 className="pop-title">{title}</h1>
          <span className="close" onClick={() => setClick(false)}>
            &times;
          </span>
          <div className="joke-box">
            <h2 className="joke">" {joke}. "</h2>
            <button onClick={GetJoke}>Next joke</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
