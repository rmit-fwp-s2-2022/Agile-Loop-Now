//The code below is taken from Lectorial code archive week 8
//Writen by Shekhar Kalra
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-type": "application/json",
  },
});
