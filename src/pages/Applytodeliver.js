import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

function Applytodeliver() {
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [salary, setSalary] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("ssid");
    const decodedToken = jwt_decode(token);
    if (decodedToken) {
      const userId = decodedToken.id;
      setUser(userId);
      const username = decodedToken.name;
      setName(username);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const requestBody = {
        users: user,
        name: name,
        text: text,
        email: email,
        phone: phone,
        address: address,
        salary: salary,
      };

      const response = await axios.post(
        "http://localhost:3003/deliveryrequest",
        requestBody
      );

      if (response.data.status === true) {
        console.log("All is okay here");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container">
      <main>
        <div className="application-form">
          <h2 className="text-center mb-4">Job Application Form with Upload</h2>
          <div className="application-form-detail">
            <form>
              <h4 className="mb-4">Contact Information</h4>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="fname">First Name *</label>
                  <input
                    type="text"
                    id="fname"
                    name="fname"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="lname">Last Name *</label>
                  <input
                    type="text"
                    id="lname"
                    name="lname"
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  id="email"
                  name="email"
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="tel">Phone *</label>
                <input
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  type="tel"
                  id="tel"
                  name="tel"
                  minLength="11"
                  maxLength="11"
                  className="form-control"
                  required
                />
              </div>
              <h4 className="mb-4">Position</h4>
              <hr />
              <div className="form-group">
                <label htmlFor="position">TELL US ABOUT YOURSELF *</label>
                <input
                  type="text"
                  id="position"
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                  name="position"
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="resume">Resume Upload</label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  className="form-control-file"
                />
              </div>
              <div className="form-group">
                <label htmlFor="website">Portfolio Website</label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="salary">Salary Requirements</label>
                <input
                  type="text"
                  id="salary"
                  onChange={(e) => {
                    setSalary(e.target.value);
                  }}
                  name="salary"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="joining">When can you start?</label>
                <input
                  type="text"
                  id="joining"
                  name="joining"
                  className="form-control"
                />
              </div>
              <br />
              <div className="form-group">
                <label htmlFor="last-employer">Address?</label>
                <input
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  type="text"
                  id="last-employer"
                  name="last-employer"
                  autoComplete="off"
                  className="form-control"
                />
              </div>

              <hr />
              <br />
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Applytodeliver;
