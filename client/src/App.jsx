import { lazy } from "react";
import { motion } from "framer-motion";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const Home = lazy(() => import("./Pages/Home"));
const SignUp = lazy(() => import("./Pages/SignUp"));
const Login = lazy(() => import("./Pages/Login"));
const About = lazy(() => import("./Pages/About"));
const Contact = lazy(() => import("./Pages/Contact"));
const Properties = lazy(() => import("./Pages/Properties"));
const AddProperties = lazy(() => import("./Pages/AddProperties"));
const PropertyDetails = lazy(() => import("./Pages/PropertyDetails"));
const Chat = lazy(() => import("./Pages/Chat"));
const Wishlist = lazy(() => import("./components/Wishlist"));

function App() {
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
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add" element={<AddProperties />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
