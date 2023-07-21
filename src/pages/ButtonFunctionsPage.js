import image1 from "../picture/icons8-chicken-64.png"
import image2 from "../picture/icons8-drink-30.png"
import image3 from "../picture/icons8-icecream-30.png"
import image4 from "../picture/icons8-rice-30.png"
import image5 from "../picture/icons8-fish-30.png"
import image6 from "../picture/icons8-rice-30.png"
import image7 from "../picture/icons8-fruits-30.png"
import image8 from "../picture/icons8-curry-48.png"
import image9 from "../picture/icons8-food-menu-40.png"
import image10 from "../picture/not fond.png"
import image11 from "../picture/add-to-cart.png"
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"


const ButtonFunctionsPage = (props) => {
  const [activeButton, setActiveButton] = useState(0);
  const [foods, setFoods] = useState([]);

  const handleButtonClick = async (buttonIndex) => {
    setActiveButton(buttonIndex);
    buttonFunctions[buttonIndex]();
  };

  const buttonFunctions = [
    () => {
      console.log("Button 1 clicked");

      axios.get("http://localhost:3003/food").then((res) => {
        console.log(res.data);
        setFoods(res.data.food);
      });
    },
    () => {
      console.log("Button 2 clicked");
      axios.get("http://localhost:3003/all/Chicken").then((res) => {
        console.log(res.data);
        setFoods(res.data.food);
      });
    },
    () => {
      console.log("Button 3 clicked");
      axios.get("http://localhost:3003/all/Chicken").then((res) => {
        console.log(res.data);
        setFoods(res.data.food);
      });
    },
    () => {
      console.log("Button 4  clicked");
      axios.get("http://localhost:3003/all/Chicken").then((res) => {
        console.log(res.data);
        setFoods(res.data.food);
      });
    },
    () => {
      console.log("Button 5 clicked");
      axios.get("http://localhost:3003/all/Chicken").then((res) => {
        console.log(res.data);
        setFoods(res.data.food);
      });
    },
    () => {
      console.log("Button 6 clicked");
      axios.get("http://localhost:3003/all/Chicken").then((res) => {
        console.log(res.data);
        setFoods(res.data.food);
      });
    },
    () => {
      console.log("Button 7 clicked");
      axios.get("http://localhost:3003/all/Chicken").then((res) => {
        console.log(res.data);
        setFoods(res.data.food);
      });
    },
    () => {
      console.log("Button 8 clicked");
      axios.get("http://localhost:3003/all/Chicken").then((res) => {
        console.log(res.data);
        setFoods(res.data.food);
      });
    },
    // ... Define functions for the other buttons
  ];

  const buttonData = [
    { id: 1, label: 'Menu', image: image9 },
    { id: 2, label: 'Chicken', image: image1 },
    { id: 3, label: 'Drinks', image: image2 },
    { id: 4, label: 'Ice-cream', image: image3 },
    { id: 5, label: 'Deserts', image: image4 },
    { id: 6, label: 'Fish', image: image5 },
    { id: 7, label: 'Rice', image: image6 },
    { id: 8, label: 'curry', image: image8 },
    { id: 9, label: 'Fruits', image: image7 },
  ];


  let card;

  if (foods.length < 0) {
    card = (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    )
  } else if (foods.length === 0) {
    card = (
      <div className=" container">
        <div className="row">
          <div className="col-md-4">
          </div>
          <div className="col-md-4">
            <img className="not-found" alt="button-function" src={image10} />
            <p className="justify-content-center">No Food Items Available</p>
          </div>

        </div>
      </div>
    )
  } else {
    card = (

      <div className="container ">
        <div className="row">
          
          {foods.map((food) => (
            <div className="col-md-3" key={food.id}>
              <div class="menucard">
                <div className="img-con">
                  <img className="menucard-img" src={food.image} alt="card" />
                  <div className="cart-img" onClick={ () => { props.addtocart(food) } }  ><img src={image11} alt="cart" /></div>

                </div>
                <div className="text">
                <p className="text-end">{food.title}</p>
                <p className="text-end des" >{food.description}</p>
                <p className="text-end">{food.price}</p>
              </div>
              <Link type="button" to={"/detailpage/"+food._id} class="btn btn-dark btn-rounded">detail</Link>
            </div>
            </div>
          ))}
          <div className="col-md-1"></div>
        </div></div>



    );
  }
  return (
    <>
   
   <div className="row justify-content-center buttonsmenu">
  {buttonData.map((button, index) => (
    <div className="col-md-7 col-sm-8" key={button.id}>
      <button
        className={`btn menubutton btn-block ${activeButton === index ? 'active' : ''}`}
        onClick={() => handleButtonClick(index)}
      >
        <img src={button.image} alt={button.label} className="button-image top-left" />
        <img src={button.image} alt={button.label} className="button-image top-right" />
        {button.label}
      </button>
    </div>
  ))}
</div>

    {card}
 </>
  );
};

export default ButtonFunctionsPage;






