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
import Admin from "../pages/admin/Admin";
import DashboardPage from "../pages/admin/DashboardPage";
import ListProductsPage from "../pages/admin/ListProductsPage";
import CategoryPage from "../pages/admin/CategoryPage";

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
      <Route path="/" element={<Admin />}>
        <Route index path="admin" element={<DashboardPage />} />
        <Route path="list-products" element={<ListProductsPage />} />
        <Route path="category" element={<CategoryPage />} />

      </Route>
    </Routes>
  );
}
