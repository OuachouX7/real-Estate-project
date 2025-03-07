import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [signUp, setSignUp] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    profile_picture: "",
  });
  const [base64Image, setBase64Image] = useState("");

  const handleImageInput = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setBase64Image(reader.result);
      setSignUp({ ...signUp, profile_picture: reader.result });
    };
  };

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    try {
      axios
        .post("http://127.0.0.1:8000/api/register", {
          name: signUp.name,
          email: signUp.email,
          phone: signUp.phone,
          password: signUp.password,
          profile_picture: signUp.profile_picture,
        })
        .then((res) => {
          console.log(res);
          navigate("/");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Name"
              onChange={(e) => setSignUp({ ...signUp, name: e.target.value })}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Email"
              onChange={(e) => setSignUp({ ...signUp, email: e.target.value })}
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Phone"
              onChange={(e) => setSignUp({ ...signUp, phone: e.target.value })}
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
              placeholder="Password"
              onChange={(e) =>
                setSignUp({ ...signUp, password: e.target.value })
              }
            />
          </div>
          <div>
            <label
              htmlFor="profile_picture"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Picture
            </label>
            <input
              type="file"
              id="profile_picture"
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              onChange={handleImageInput}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
