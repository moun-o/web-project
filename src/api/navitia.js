import axios from "axios";

 const token = "b976965d-4edc-4994-857f-daecbec8187f";
 const sncf = axios.create({
   baseURL: `https://api.sncf.com/v1`,
   headers: {
     Authorization: token,
   },
 });
 export default sncf;

