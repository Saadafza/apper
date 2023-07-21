
import { useState } from "react"
import axios from "axios"
import { Navigate,Link, useNavigate } from "react-router-dom"
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigator = useNavigate();
    const handlesubmit = () => {
      setIsLoading(true);
      axios.post("http://localhost:3003/login", {
        email: email,
        password: password
      })
        .then((response) => {
          console.log(response.data);
          const { status, token, message } = response.data;
          if (status === 'false') {
            setError(message);
            setIsLoading(false);
          } else if (status === 'true') {
            setError(null);
            localStorage.setItem("ssid", token);
            navigator("/");
          }
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error.message);
        });
    };
    return(
        <>
        <form className="col-md-4 justify-content-center" >

  <div className="form-outline mb-4 ">
    <input type="email" id="form2Example1" onChange={(e)=>{setEmail(e.target.value)}} className="form-control" />
    <label className="form-label" for="form2Example1">Email address</label>
  </div>

  <div className="form-outline mb-4">
    <input type="password" id="form2Example2" onChange={(e)=>{setPassword(e.target.value)}} className="form-control" />
    <label className="form-label" for="form2Example2">Password</label>
    {
                        (error !== null) ? <p className='alert alert-danger'>{error}</p> : null
                    }
  </div>


  <div className="row mb-4">
    <div className="col d-flex justify-content-center">
    
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked />
        <label className="form-check-label" for="form2Example31"> Remember me </label>
      </div>
    </div>

    <div className="col">
     
      <a href="#!">Forgot password?</a>
    </div>
  </div>


  <button type="button" onClick={handlesubmit} className="btn btn-primary btn-block mb-4" disabled={(isLoading == true)? true:false}>{isLoading ? "Loading...":"Login"}</button>


  <div className="text-center">
    <p>Not a member? <a href="/signup">Register</a></p>
    <p>or sign up with:</p>
    <button type="button" className="btn btn-link btn-floating mx-1">
      <i className="fab fa-facebook-f"></i>
    </button>

    <button type="button" className="btn btn-link btn-floating mx-1">
      <i className="fab fa-google"></i>
    </button>

    <button type="button" className="btn btn-link btn-floating mx-1">
      <i className="fab fa-twitter"></i>
    </button>

    <button type="button" className="btn btn-link btn-floating mx-1">
      <i className="fab fa-github"></i>
    </button>
  </div>
</form>
        </>
    )
} 
export default Login

