import { useEffect, useState } from "react";
import { getPaginatedEmployees } from "../useCase/employe/GetEmploye.js";
import { InsertEmployees } from "../useCase/employe/InserEmploye.js";

function EmpleadoPage() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: "", salary: "", dateAdmission: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  useEffect(() => {
    fetchEmployees(currentPage);
  }, [currentPage]);

  const fetchEmployees = async (page) => {
    try {
      const { data, totalPages } = await getPaginatedEmployees(page, limit);
      setEmployees(data);
      setTotalPages(totalPages);
    } catch (err) {
      console.error("Error al obtener empleados:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await InsertEmployees(form);
      setForm({ name: "", salary: "", dateAdmission: "" });
      fetchEmployees(currentPage);
    } catch (error) {
      console.error("Error al insertar empleado:", error);
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "24px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Bienvenido Empleado</h1>

      <h3>Agregar nuevo empleado</h3>
      <form
        onSubmit={handleCreate}
        style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}
      >
        <input
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          name="salary"
          placeholder="Salario"
          type="number"
          value={form.salary}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          name="dateAdmission"
          type="date"
          value={form.dateAdmission}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <button
          type="submit"
          style={{
            padding: "10px 16px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Crear
        </button>
      </form>

      <table style={{ width: "100%", borderCollapse: "collapse", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
        <thead style={{ backgroundColor: "#f4f4f4" }}>
          <tr>
            <th style={thStyle}>Nombre</th>
            <th style={thStyle}>Salario</th>
            <th style={thStyle}>Fecha de admisión</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td style={tdStyle}>{emp.name}</td>
              <td style={tdStyle}>${emp.salary}</td>
              <td style={tdStyle}>{emp.dateAdmission.slice(0, 10)}</td>
            </tr>
          ))}
          {employees.length === 0 && (
            <tr>
              <td colSpan="3" style={{ textAlign: "center", padding: "12px" }}>No hay empleados</td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={paginationButton}
        >
          Anterior
        </button>
        <span style={{ margin: "0 10px" }}>{currentPage} / {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={paginationButton}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  flex: "1",
  padding: "8px",
  minWidth: "200px",
};

const thStyle = {
  padding: "12px",
  textAlign: "left",
  borderBottom: "2px solid #ccc",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

const paginationButton = {
  padding: "8px 12px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "4px",
};

export default EmpleadoPage;
