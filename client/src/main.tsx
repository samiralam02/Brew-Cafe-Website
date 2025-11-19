import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { CartProvider } from "./context/CartContext";

import Dashboard from "./pages/Dashboard";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <CartProvider>
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard Layout */}
        <Route path="/" element={<Dashboard />}>
          {/* Default route → redirect to menu */}
          <Route index element={<Navigate to="menu" replace />} />

          <Route path="menu" element={<Menu />} />
          <Route path="cart" element={<Cart />} />

          {/* Admin Route */}
        </Route>
        <Route path="admin" element={<AdminDashboard />} />

      </Routes>
    </BrowserRouter>
  </CartProvider>
);
