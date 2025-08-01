import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { insertUser } from "../useCase/userRegister/CreateUser.js"
function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: false, // por defecto empleado
  });

  const navigate = useNavigate();

  const isFormValid = form.name && form.email && form.password;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleToggle = () => {
    setForm((prev) => ({ ...prev, role: !prev.role }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await insertUser(form);
      navigate("/");
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Crear cuenta</h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} style={inputStyle} required />
          <input name="email" placeholder="Correo" type="email" value={form.email} onChange={handleChange} style={inputStyle} required />
          <input name="password" placeholder="Contraseña" type="password" value={form.password} onChange={handleChange} style={inputStyle} required />

          <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ minWidth: "90px" }}>{form.role ? "Administrador" : "Empleado"}</span>
            <input
              type="checkbox"
              checked={form.role}
              onChange={handleRoleToggle}
              style={switchStyle}
            />
          </label>

          <button type="submit" disabled={!isFormValid} style={{
            ...buttonStyle,
            backgroundColor: isFormValid ? "#28a745" : "#ccc",
            cursor: isFormValid ? "pointer" : "not-allowed",
          }}>
            Crear cuenta
          </button>
        </form>
      </div>
    </div>
  );
}

// Estilos
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
};

// Estilo tipo switch
const switchStyle = {
  width: "40px",
  height: "20px",
  cursor: "pointer",
};

export default RegisterPage;
