import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const[email,setEmail]=useState(""),[password,setPassword]=useState(""),navigate=useNavigate(),handleLogin=e=>{e.preventDefault();try{axios.post("http://127.0.0.1:8000/api/login",{email:email,password:password}).then(e=>{console.log(e),localStorage.setItem("token",e.data.token),localStorage.setItem("user",e.data.user.name),localStorage.setItem("userId",e.data.user.id),localStorage.setItem("profilePicture",e.data.user.profile_picture),navigate("/")})}catch(t){console.log(t)}};
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Connect
          </button>
        </form>
        <div className="text-center">
          <Link to="/sign-up" className="text-indigo-600 hover:text-indigo-800">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
