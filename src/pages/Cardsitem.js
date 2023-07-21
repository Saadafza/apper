import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cardsitem = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3003/food")
      .then((res) => {
        console.log(res.data);
        setFoods(res.data.food);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="main-body" style={{ backgroundColor: "#4286f4" }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div id="inam" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner">
                {foods.map((food, index) => (
                  <div
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                    key={food.id}
                  >
                    <div className="container">
                      <div className="row">
                        {foods.slice(index, index + 3).map((food) => (
                          <div className="col-sm-12 col-lg-4" key={food.id}>
                            <div className="card" style={{ width: "300px", margin: "auto" }}>
                              <img src={food.image} className="card-img-top" alt="card" />
                              <div className="card-body">
                                <h4 className="card-title">{food.title}</h4>
                                <p className="card-text">{food.description}</p>
                                <button type="button" className="btn btn-warning">Read More</button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <a href="#inam" className="carousel-control-prev" data-slide="prev">
                <span className="carousel-control-prev-icon"></span>
              </a>
              <a href="#inam" className="carousel-control-next" data-slide="next">
                <span className="carousel-control-next-icon"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cardsitem;
