import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
 
const Login = ({ setIsConnected }) => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();


  const handleLogin = (e) => {
    e.preventDefault();
    try {
      axios.post("http://127.0.0.1:8000/api/login",{
        email:email,
        password:password,
      }).then((res) => {
        console.log(res);
        localStorage.setItem("token",res.data.token);


        navigate("/home");



      })
      
    } catch (error) {
      console.log(error);
      
    }


  }



  return (
    <div>
      <h1>Login</h1>
      <input className="border"  type="text" onChange={(e) => setEmail(e.target.value)}/> 
      <input  className="border"  type="password" onChange={(e) => setPassword(e.target.value)}/>
      <button  onClick={handleLogin} >
        Connect
      </button>
      <Link to="/sign-up">Sign up</Link>
    </div>
  );
};

export default Login;
