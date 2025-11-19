import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="menu" element={<Menu />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}
