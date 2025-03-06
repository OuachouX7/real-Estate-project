import { useState, lazy } from "react";
import { motion } from "framer-motion";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const Home = lazy(() => import("./Pages/Home"));
const SignUp = lazy(() => import("./Pages/SignUp"));
const Login = lazy(() => import("./Pages/Login"));

function App() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="w-full h-screen flex justify-center items-center">
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="w-36 h-36 border-4 border-t-transparent border-b-[#000] border-l-[#000] border-r-[#000] rounded-full"
            ></motion.div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/sign-up"
            element={<SignUp setIsConnected={setIsConnected} />}
          />
          <Route
            path="/home"
            element={<Home setIsConnected={setIsConnected} />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
