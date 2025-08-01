import { useState, useContext } from "react";
import { loginRequest } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await loginRequest(email, password);
      const user = jwtDecode(token);

      login(token);

      if (user.role) {
        navigate("/admin");
      } else {
        navigate("/empleado");
      }
    } catch (err) {
      setError("Credenciales inválidas");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Iniciar sesión</h2>

        {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
            autoComplete="off"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
            autoComplete="off"
          />

          <button type="submit" style={buttonStyle}>Ingresar</button>
        </form>

        <button
          onClick={() => navigate("/register")}
          style={{ ...buttonStyle, backgroundColor: "#007bff", marginTop: "10px" }}
        >
          Registrar
        </button>
      </div>
    </div>
  );
}

// Estilos reutilizables
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f7f7f7",
};

const cardStyle = {
  width: "100%",
  maxWidth: "400px",
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "12px",
  boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
};

const inputStyle = {
  padding: "10px",
  fontSize: "16px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "10px",
  color: "white",
  border: "none",
  fontSize: "16px",
  borderRadius: "6px",
  cursor: "pointer",
  backgroundColor: "#28a745",
};

export default LoginPage;
