import React from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBInput,
  

}
    from 'mdb-react-ui-kit';
import image1 from "../picture/chef1.705417f3cf231c71d1bd.png"
import { useState } from 'react';
import axios from 'axios';
function Create() {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [discount, setDiscount] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [image, setImage] = useState("")




    const handleSubmit = () => {
        axios.post("http://localhost:3003/create", {
            title: title,
            price: price,
            discount: discount,
            description: description,
            category: category,
            image: image

        }, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          ).then( (res) => {
            if(res.data.status === true) {
             console.log("all is okay")
            } else {
              console.log(res.data.errors);
              if(res.data.status === false) {
              console.log("problem")
              }
    
            }
          })
    
 
    
    
      }
    
    



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
                                <h3 className="mb-5 text-uppercase fw-bold">Food Registeration</h3>

                                <MDBRow>

                                    <MDBCol md='6'>
                                        <MDBInput wrapperClass='mb-4' label='TITLE' onChange={(e) => { setTitle(e.target.value) }} size='lg' id='form1' type='text' />
                                    </MDBCol>

                                    <MDBCol md='6'>
                                        <MDBInput wrapperClass='mb-4' label='PRICE' onChange={(e) => { setPrice(e.target.value) }} size='lg' id='form2' type='text' />
                                    </MDBCol>

                                </MDBRow>

                                <MDBInput wrapperClass='mb-4' label='Discount Price' onChange={(e) => { setDiscount(e.target.value) }} size='lg' id='form3' type='text' />
                                <MDBInput wrapperClass='mb-4' label='Category' onChange={(e) => { setCategory(e.target.value) }} size='lg' id='form4' type='text' />
                                <MDBInput wrapperClass='mb-4' label='Description' onChange={(e) => { setDescription(e.target.value) }} size='lg' id='form5' type='text' />
                                <MDBInput wrapperClass='mb-4' label='Email ID' size='lg' id='form6' type='text' />
                                <input type="file" className="form-control" onChange={(e) => { setImage(e.target.files[0]) }} />

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

export default Create;