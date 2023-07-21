import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid, Card, CardContent, Typography, TextField, Button,CardMedia } from "@mui/material";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

const DetailPage = () => {
  const [product, setProduct] = useState({});
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [user, setUser] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("ssid");
    const decodedToken = jwt_decode(token);
    if (decodedToken) {
      const userId = decodedToken.id;
      setUser(userId);
    }
  }, []);

  useEffect(() => {
    fetchProduct();
    fetchComments();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:3003/getfoods/${id}`);
      setProduct(response.data.food);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:3003/getcomment/${id}`);
      setComments(response.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3003/comment", {
        comment: commentInput,
        users: user,
        deals: id
      });

      if (response.data.status === true) {
        fetchComments();
        setCommentInput("");
        console.log(response.data)
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleCommentChange = (event) => {
    setCommentInput(event.target.value);
  };

  return (
    <Container maxWidth="md">
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <Card>
        <CardMedia
    component="img"
    height="100"
 
    image={product.image} 
    alt="Product Image"
  />
          <CardContent>
            <Typography variant="h4">{product.title}</Typography>
            <Typography variant="body1">{product.description}</Typography>
            <Typography variant="body2">Price: ${product.price}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5">Add a Comment</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Your Comment"
                variant="outlined"
                value={commentInput}
                onChange={handleCommentChange}
                fullWidth
              />
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
        <Grid item xs={12}>
  {comments.map((comment) => (
    <Card key={comment._id} variant="outlined">
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <img src={"http://localhost:3003/" +comment.user[0].image} alt="User" width="50" height="50" />
          </Grid>
          <Grid item>
            <Typography variant="h6">{comment.user[0].name}</Typography>
            <Typography variant="body1">{comment.comment}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  ))}
</Grid>

      </Grid>
    </Container>
  );
};

export default DetailPage;
