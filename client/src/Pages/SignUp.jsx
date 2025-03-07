import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [signUp, setSignUp] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

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
    <>
      <div>SignUp</div>
      <input
        className="border"
        placeholder="Name"
        type="text"
        onChange={(e) => setSignUp({ ...signUp, name: e.target.value })}
      />
      <input
        className="border"
        placeholder="Email"
        type="email"
        onChange={(e) => setSignUp({ ...signUp, email: e.target.value })}
      />
      <input
        className="border"
        placeholder="Phone"
        type="text"
        onChange={(e) => setSignUp({ ...signUp, phone: e.target.value })}
      />
      <input
        className="border"
        placeholder="Password"
        type="password"
        onChange={(e) => setSignUp({ ...signUp, password: e.target.value })}
      />

      <button onClick={handleSignup}>Sign up</button>
    </>
  );
};

export default SignUp;
