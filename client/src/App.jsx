import { lazy } from "react";
import { Suspense } from "react";
import Spinner from "./Components/Loading/Spinner";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import useUsers from "./Hooks/useUsers";
const Home = lazy(() => import("./Pages/Home/Home"));
const Explore = lazy(() => import("./Pages/Explore/Explore"));
const SignUp = lazy(() => import("./Pages/Auth/SignUp"));
const EditProperty = lazy(() => import("./Pages/Properties/EditProperty"));
const PropertyDetails = lazy(() =>
  import("./Pages/Properties/PropertyDetails")
);
const Login = lazy(() => import("./Pages/Auth/Login"));
const AddProperties = lazy(() => import("./Pages/Properties/AddProperties"));
const About = lazy(() => import("./Pages/About/About"));
const Contact = lazy(() => import("./Pages/Contact/Contact"));
const Properties = lazy(() => import("./Pages/Properties/Properties"));
const Chat = lazy(() => import("./Pages/Chat/Chat"));
const Wishlist = lazy(() => import("./Pages/Wishlist/Wishlist"));
const Users = lazy(() => import("./Pages/Users/Users"));
const Navbar = lazy(() => import("./Components/Navbar/Navbar"));
const AdminNavbar = lazy(() => import("./Components/Navbar/AdminNavbar"));
const Footer = lazy(() => import("./Components/Footer/Footer"));

function App() {
  const users = useUsers("/users")
  const token = sessionStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const isAdmin = users.find(
    (user) => user.role == "admin" && user.id == userId && token
  );

  return (
    <BrowserRouter>
      <AppContent isAdmin={isAdmin} />
    </BrowserRouter>
  );
}

function AppContent({ isAdmin }) {
  const location = useLocation();
  const isChatRoute = location.pathname.startsWith("/chat");

  return (
    <>
      {!isChatRoute && (isAdmin ? <AdminNavbar /> : <Navbar />)}
      <Suspense fallback={<Spinner />}>
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
      {!isChatRoute && <Footer />}
    </>
  );
}

export default App;
