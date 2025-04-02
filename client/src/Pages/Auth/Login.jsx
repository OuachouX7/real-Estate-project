import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [error, setError] = useState(false),
    navigate = useNavigate(),
    handleLogin = (e) => {
      e.preventDefault();
      try {
        axiosInstance
          .post("/login", {
            email: email,
            password: password,
          })
          .then((e) => {
            console.log(e),
              sessionStorage.setItem("token", e.data.token),
              localStorage.setItem("user", e.data.user.name),
              localStorage.setItem("userId", e.data.user.id),
              localStorage.setItem(
                "profilePicture",
                e.data.user.profile_picture
              ),
              navigate("/");
          })
          .catch(() => setError(true));
      } catch (e) {
        setError(true);
        
      }
    };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="text"
              id="email"
              className="w-full px-4 py-3 mt-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="Enter your email"
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
              className="w-full px-4 py-3 mt-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 font-medium text-white bg-indigo-600 rounded-md shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition transform hover:scale-105"
          >
            Connect
          </button>
        </form>

        {error && (
          <div className="text-red-500 text-center mt-4">
            {error}
          </div>
        )}

        <div className="text-center mt-4">
          <Link
            to="/sign-up"
            className="text-indigo-600 hover:text-indigo-800 transition"
          >
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
