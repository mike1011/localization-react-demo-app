import axios from 'axios';
//use process.env for env specific baseURL
export default axios.create({
  baseURL: `http://localhost:3000/api/v1`
});