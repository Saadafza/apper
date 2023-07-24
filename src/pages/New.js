import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const New = () => {
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
    <>
    <h3 style={{ marginLeft:"40px" ,marginTop:"50px"}}>Our Fresh & Healthy Fruits</h3>
  <hr className='linefood'></hr>
    <div className="row" style={{ backgroundColor: "#D3CFD5" ,marginLeft:"40px",marginRight:"40px" ,borderRadius:"10px" }}>
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
                          <div className="col-sm-12 mt-3 mb-3 col-lg-3 mx-3" key={food.id}>
                            <div className="card" style={{ width: "300px", margin: "auto" ,borderRadius:"5px" }}>
                              <img src={food.image} className="card-img-top" style={{ height: "100px", width:"auto", margin: "auto" }} alt="card" />
                              <div className="card-body">
                                <h4 className="card-title">{food.title}</h4>
                                <p className="card-text">{food.description}</p>
                                <Link type="button" to={"/detailpage/"+food._id} className="btn btn-warning">Detail</Link>
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
    </>
  );
}

export default New;