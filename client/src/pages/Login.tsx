import { useState } from "react";
import { login } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // default import works now

type TokenPayload = {
  id: string;
  role: "admin" | "customer"; // adjust roles as per your backend
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await login({ email, password });
      localStorage.setItem("token", token);

      // Decode JWT to check role
      const decoded = jwtDecode<TokenPayload>(token);

      if (decoded.role === "admin") {
        navigate("/admin"); // Admin dashboard
      } else {
        navigate("/menu"); // Customer menu
      }
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Login</h2>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required
        style={{ display: "block", width: "100%", margin: "10px 0", padding: "8px" }}
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required
        style={{ display: "block", width: "100%", margin: "10px 0", padding: "8px" }}
      />
      <button type="submit" style={{ padding: "10px 20px", marginTop: "10px" }}>
        Login
      </button>
    </form>
  );
}
