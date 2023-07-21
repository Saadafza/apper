
import { useEffect, useState } from 'react';
import axios from 'axios';
function All() {
    const [foods, setFoods] = useState([]);


    useEffect(() => {

        axios.get("http://localhost:3003/food").then((res) => {


            setFoods(res.data.food);

        })

    }, []);
    const Chicken = () => {
        axios.get("http://localhost:3003/getfood/Chicken").then((res) => {
            console.log(res.data);

            setFoods(res.data.food);

        })
    }
    const Icecream = () => {
        axios.get("http://localhost:3003/getfood/Ice").then((res) => {
            console.log(res.data);

            setFoods(res.data.food);

        })
    }
    const Fruits = () => {
        axios.get("http://localhost:3003/getfood/Fruit").then((res) => {
            console.log(res.data);

            setFoods(res.data.food);

        })
    }
    const Desert = () => {
        axios.get("http://localhost:3003/getfood/desert").then((res) => {
            console.log(res.data);

            setFoods(res.data.food);

        })
    }
    return (
        <>
            <button type="button" onClick={Chicken} class="btn btn-primary">Primary</button>
            <button type="button" onClick={Fruits} class="btn btn-secondary">Secondary</button>
            <button type="button" onClick={Icecream} class="btn btn-success">Success</button>
            <button type="button" onClick={Desert} class="btn btn-danger">Danger</button>
            <div className="container">
                <div className="row">
                    {foods.map((food) => {
                        return (
                            <div className="col-sm-3">
                                <div class="card main" >
                                    <img src={food.image} class="card-img-top img-detail" alt="..." />
                                    <div class="card-body">
                                        <h5 class="card-title">{food.name}</h5>


                                    </div>
                                </div></div>
                        )
                    })}
                </div> </div>


        </>
    )
}
export default All