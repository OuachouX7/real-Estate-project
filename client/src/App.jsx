import { lazy } from "react";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const Home = lazy(() => import("./Pages/Home/Home"));
const Explore = lazy(() => import("./Pages/Explore/Explore"));
const SignUp = lazy(() => import("./Pages/Auth/SignUp"));
const EditProperty = lazy(() => import("./Pages/Properties/EditProperty"));
const PropertyDetails = lazy(() => import("./Pages/Properties/PropertyDetails"));
const Login = lazy(() => import("./Pages/Auth/Login"));
const AddProperties = lazy(() => import("./Pages/Properties/AddProperties"));
const About = lazy(() => import("./Pages/About/About"));
const Contact = lazy(() => import("./Pages/Contact/Contact"));
const Properties = lazy(() => import("./Pages/Properties/Properties"));
const Chat = lazy(() => import("./Pages/Chat/Chat"));
const Wishlist = lazy(() => import("./Pages/Wishlist/Wishlist"));
const Users = lazy(() => import("./Pages/Users/Users"));
const Spinner = lazy(() => import("./Components/Loading/Spinner"));



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
