import axios from "axios";
//Axios is a very popular fetching library, we can fetch , we can post request,
//allows us to interact with API very easily
//easy way of adding baseURL, widely used

const instance = axios.create({
  //create an object   // THE API URL(cloud function)
  baseURL: "https://us-central1-clone-319f0.cloudfunctions.net/api",
  //"http://localhost:5001/clone-319f0/us-central1/api", //local host API only for debug and test
});
//local endpoint API from index.js of (functions folder- backend)

export default instance;
