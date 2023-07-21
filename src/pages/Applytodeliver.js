import { useState,useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode"

function Applytodeliver(){
    const[user,setUser]=useState("")
    const[name,setName]=useState("")
    const[text,setText]=useState("")
    const[email,setEmail]=useState("")
    const[phone,setPhone]=useState("")
    const[address,setAddress]=useState("")
    const[salary,setSalary]=useState("")
    useEffect(() => {
        const token = localStorage.getItem("ssid");
        const decodedToken = jwt_decode(token);
        if (decodedToken) {
          const userId = decodedToken.id;
          setUser(userId);
          const username = decodedToken.name
          setName(username)
        
        }
      }, []);
      console.log(name)
      console.log(user)
      const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const requestBody = {
            users: user,
            name: name,
            text: text,
            email:email,
            phone:phone,
            address:address,
            salary:salary

          };
    
          const response = await axios.post("http://localhost:3003/deliveryrequest", requestBody);
    
          if (response.data.status === true) {
            console.log("All is okay here");
         
          }
        }  catch (error) {
          console.error("Error submitting form:", error);
        }
      };
    

    return(
        <>
        <div className="containercon">
  <main>
    <div className="application-form">
      <h2>Job Application Form with Upload</h2>
      <div className="application-form-detail">
        <form>
          <h4>Contact Information</h4>
          <div className="form-inline">
            <div className="form-group">
              <label>First Name *</label>
              <input type="text" id="fname" name="fname" required />
            </div>
            <div className="form-group">
              <label>Last Name *</label>
              <input type="text" id="lname" name="lname" required />
            </div>
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input type="email" onChange={(e)=>{setEmail(e.target.value)}} id="email" name="email" required />
          </div>
          <div className="form-group">
            <label>Phone *</label>
            <input onChange={(e)=>{setPhone(e.target.value)}}
              type="tel"
              id="tel"
              name="tel"
              minLength="11"
              maxLength="11"
              required
            />
          </div>
          <br />
          <h4>Position</h4>
          <hr />
          <div className="form-group">
            <label>TELL US ABOUT YOURSELF *</label>
            <input type="text" id="position" onChange={(e)=>{setText(e.target.value)}} name="position" required />
          </div>
          <div className="form-group">
            <label>Resume Upload</label>
            <input type="file" id="resume" name="resume" />
          </div>
          <div className="form-group">
            <label>Portfolio Website</label>
            <input type="url" id="website" name="website" />
          </div>
          <div className="form-group">
            <label>Salary Requirements</label>
            <input type="text" id="salary" onChange={(e)=>{setSalary(e.target.value)}} name="salary" />
          </div>
          <div className="form-group">
            <label>When can you start?</label>
            <input type="text" id="joining" name="joining" />
          </div>
          <br />
       
          <div className="form-group">
            <label>Address?</label>
            <input onChange={(e)=>{setAddress(e.target.value)}}
              type="text"
              id="last-employer"
              name="last-employer"
              autoComplete="off"
            />
          </div>
          
          <hr />
          <br />
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </div>
  </main> {/* Main Area */}
</div>

      
        </>
    )
}
export default Applytodeliver;