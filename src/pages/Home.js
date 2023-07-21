import image1  from "../picture/chef1.705417f3cf231c71d1bd.png"
import image2  from "../picture/delivery.bf9130a0962fbe091abc.png"
import { useEffect,useState } from 'react';
import axios from 'axios';
import ButtonFunctionPage from "./ButtonFunctionsPage"
function Home() {
    const [foods, setFoods] = useState([]);

    useEffect( () => {
    
    
      axios.get("http://localhost:3003/all/Chicken").then( (res) => {
    
        console.log(res.data);
        
          setFoods(res.data.food);
        
      })
    
     }, [] );
    return(
        <div>
        <div className=" container-fluid sec">
            <div className="row">
                
            <div className="col-md-5 mx-4 col hero ">
            <div class="delivery">
        <div class="bike-delivery">
        <span>Bike Delivery</span>
        <div className="image"><img src={image2} alt="Bike Delivery"/></div>
          
          
        </div>
      </div>
      <div className="title">
      <h1>The Fastest Food
      Delivery in <span>Accara</span> </h1>
      </div>
      <p className="loerm">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus nam
       delectus sed, vel quaerat, libero nesciunt debitis, architecto repudiandae
        accusamus aut exercitationem nisi non doloribus! Temporibus officia 
        architecto reiciendis blanditiis.
      </p>
      <button type="button" class="btn btn-warning">Order Now</button>
      
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-5 cass">
           
                {
                    <div className="container">
                    <div className="row">
    
                    {foods.slice(0, 3).map((food) => (
              <div className="col-md-4" key={food.id}>
                <div class="hee">
                    <img src={food.image} alt="card"/>
                    <p className="text-center">{food.title}</p>
                    <p className="text-center des" >{food.description}</p>
                    <p className="text-center">{food.price}</p>
                    </div>
              </div>
            ))}
          </div>
          <div className="row justify-content-center">
            {foods.slice(3 ,4).map((food) => (
              <div className="col-md-4" key={food.id}>
              <div class="hee">
                    <img src={food.image} alt="Img"/>
                    <p className="text-center">{food.title}</p>
                    <p className="text-center des" >{food.description}</p>
                    <p className="text-center">{food.price}</p>
                    </div>
              </div>
            ))}
                  </div> </div>
                }
               </div>
            </div>
    <ButtonFunctionPage/>
        <div class="image-container">
        <img src={image1} alt="cont" class="shaking-image"/>
      </div>

        </div></div>
    )
}

export default Home