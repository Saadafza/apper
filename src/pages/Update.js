import React, { useState, useEffect } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import image1 from "../picture/chef1.705417f3cf231c71d1bd.png";
import { useParams, useNavigate } from 'react-router-dom'; // Updated import
import axios from 'axios';

function Update() {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate(); // Updated hook

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3003/getfoods/${id}`)
      .then((res) => {
        const item = res.data;
        console.log(item)
        setTitle(item.food.title);
        setPrice(item.food.price);
        setDiscount(item.food.discount);
        setDescription(item.food.description);
        setCategory(item.food.category);
      })
      .catch((error) => {
        console.error('Error fetching item:', error);
      });
  }, [id]);

  const handleSubmit = () => {
    axios.put(`http://localhost:3003/update/${id}`, {
        title: title,
        price: price,
        discount: discount,
        description: description,
        category: category,
        image: image
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res) => {
        console.log(res.data)
        if (res.data.status === true) {
          console.log("All is okay");
          navigate("/admin")
        } else {
          console.log(res.data.errors);
          if (res.data.status === false) {
            console.log("Problem");
          }
        }
      })
      .catch((error) => {
        console.error('Error updating item:', error);
      });
  };

  return (
    <>
    
    
      <MDBRow className='d-flex justify-content-center align-items-center h-80'>
        <MDBCol>
          <MDBCard className='my-4'>
            <MDBRow className='g-0'>
              <MDBCol md="2"></MDBCol>
              <MDBCol md='4' className="d-none d-md-block image-container">
                <MDBCardImage src={image1} alt="Sample photo" className="rounded-start shaking-image" fluid />
              </MDBCol>
              <MDBCol md='4'>
                <MDBCardBody className='text-black d-flex flex-column justify-content-center'>
                  <h3 className="mb-5 text-uppercase fw-bold">Food Registration</h3>
                  <MDBRow>
                    <MDBCol md='6'>
                      <MDBInput wrapperClass='mb-4' label='TITLE' value={title} onChange={(e) => setTitle(e.target.value)} size='lg' id='form1' type='text' />
                    </MDBCol>
                    <MDBCol md='6'>
                      <MDBInput wrapperClass='mb-4' label='PRICE' value={price} onChange={(e) => setPrice(e.target.value)} size='lg' id='form2' type='text' />
                    </MDBCol>
                  </MDBRow>
                  <MDBInput wrapperClass='mb-4' label='Discount Price' value={discount} onChange={(e) => setDiscount(e.target.value)} size='lg' id='form3' type='text' />
                  <MDBInput wrapperClass='mb-4' label='Category' value={category} onChange={(e) => setCategory(e.target.value)} size='lg' id='form4' type='text' />
                  <MDBInput wrapperClass='mb-4' label='Description' value={description} onChange={(e) => setDescription(e.target.value)} size='lg' id='form5' type='text' />
                  <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
                  <div className="d-flex justify-content-end pt-3">
                    <MDBBtn className='ms-2' color='warning' onClick={handleSubmit} size='lg'>Submit form</MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  );
}

export default Update;
