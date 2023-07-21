import { Link } from "react-router-dom"
import image1 from "../picture/chef1.705417f3cf231c71d1bd.png"
import { getToken } from "../pages/Functions"
import Example from "./Example"
function Nav(props){
  const token = getToken()
    return(
        <>
        

        <nav className="navbar navbar-expand-lg bg-body-tertiary miannav ">
  <div className="container-fluid  ">

    <Link class="navbar-brand mx-5 " href="/">
      <img src={image1} alt="Bootstrap" width="30" height="24"/><span className="topic">Bentlizone</span>
    </Link>
  
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0  mx-auto">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/menu">menu</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/applytodeliver">Become deliver</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/menu">about us</Link>
        </li>
        <li className="nav-item">
      <Example cart={props.cart} deleteall={props.deleteall}/>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/cart">menu</Link>
        </li>
      
       
      </ul>
      <div className="d-flex mx-5 my-2 " role="search">
       
      {
                                    (token === null) ? <Link className=" btn btn-dark mx-2" to="/login">Login</Link> : <Link className=" btn btn-dark mx-2" to="/logout">Logout</Link>
                                }
      </div>
    </div>
  </div>
</nav>
        </>
    )
}
export default Nav