import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import App from "../App";
import About from "../pages/About";
import Contact from "../pages/Contact";
import ProductsDetail from "../pages/ProductsDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ShoppingCart from "../pages/ShoppingCart";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index path="" element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="detail/:id" element={<ProductsDetail />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="shopping-cart" element={<ShoppingCart />} />
        
      </Route>
    </Routes>
  );
}
