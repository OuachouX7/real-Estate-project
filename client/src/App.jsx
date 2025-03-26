import { lazy } from "react";
import { motion } from "framer-motion";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const EditProperty = lazy(() => import("./Pages/EditProperty"))
const Home = lazy(() => import("./Pages/Home"));
const SignUp = lazy(() => import("./Pages/SignUp"));
const Login = lazy(() => import("./Pages/Login"));
const About = lazy(() => import("./Pages/About"));
const Contact = lazy(() => import("./Pages/Contact"));
const Properties = lazy(() => import("./Pages/Properties"));
const AddProperties = lazy(() => import("./Pages/addProperties"));
const PropertyDetails = lazy(() => import("./Pages/PropertyDetails"));
const Chat = lazy(() => import("./Pages/Chat"));
const Wishlist = lazy(() => import("./Components/Wishlist"));
const Users = lazy(() => import("./Pages/Users"));
const Explore = lazy(() => import("./Pages/Explore"));
const Spinner = lazy(() => import("./Components/Spinner"))

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <Spinner />
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/edit/:id" element={<EditProperty />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add" element={<AddProperties />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
export default App;
