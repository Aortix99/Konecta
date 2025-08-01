import { useEffect, useState } from "react";
import {
  GetAllEmployees,
  GetRequest
} from "../useCase/request/GetRequest.js";
import { insertRequest } from "../useCase/request/CreateRequest.js";
import { deleteItem } from "../useCase/request/DeleteReques.js";

import "../styles/tableStyles.css";

const AdminPage = () => {
  const [data, setData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [newRequest, setNewRequest] = useState({
    descriptions: "",
    resumen: "",
    idEmployee: ""
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  useEffect(() => {
    fetchData(currentPage);
    fetchEmployees();
  }, [currentPage]);

  const fetchData = async (page) => {
    const result = await GetRequest(page, limit); // Esta función debe devolver { data, totalPages }
    setData(result.data);
    setTotalPages(result.totalPages);
  };

  const fetchEmployees = async () => {
    const result = await GetAllEmployees();
    setEmployees(result);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRequest({ ...newRequest, [name]: value });
  };

  const isFormValid =
    newRequest.descriptions && newRequest.resumen && newRequest.idEmployee;

  const handleCreate = async () => {
    if (!isFormValid) return;
    await insertRequest(newRequest);
    setNewRequest({ descriptions: "", resumen: "", idEmployee: "" });
    fetchData(currentPage);
  };

  const handleDeleteClick = (id) => {
    setIdToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    await deleteItem(idToDelete);
    setShowModal(false);
    setIdToDelete(null);
    fetchData(currentPage);
  };

  return (
    <div className="container">
      <h1 className="title">Solicitudes Registradas</h1>

      <h3>Crear nueva solicitud</h3>
      <div className="input-group">
        <input
          type="text"
          placeholder="Descripción"
          name="descriptions"
          value={newRequest.descriptions}
          onChange={handleInputChange}
          className="input-field"
          autoComplete="off"
        />
        <input
          type="text"
          placeholder="Resumen"
          name="resumen"
          value={newRequest.resumen}
          onChange={handleInputChange}
          className="input-field"
          autoComplete="off"
        />
        <select
          name="idEmployee"
          value={newRequest.idEmployee}
          onChange={handleInputChange}
          className="input-field"
        >
          <option value="">Selecciona un empleado</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.id} | {emp.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleCreate}
          disabled={!isFormValid}
          className={`create-button ${!isFormValid ? "disabled" : ""}`}
        >
          Crear solicitud
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Código</th>
            <th>Descripción</th>
            <th>Resumen</th>
            <th>Empleado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((solicitud) => (
            <tr key={solicitud.id}>
              <td>{solicitud.id}</td>
              <td>{solicitud.code}</td>
              <td>{solicitud.descriptions}</td>
              <td>{solicitud.resumen}</td>
              <td>
                {
                  (() => {
                    const emp = employees.find(
                      (e) => e.id === solicitud.idEmployee
                    );
                    return emp
                      ? `${emp.name} | ${emp.id}`
                      : `ID: ${solicitud.idEmployee}`;
                  })()
                }
              </td>
              <td>
                <button
                  onClick={() => handleDeleteClick(solicitud.id)}
                  className="delete-button"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "12px" }}>
                No hay solicitudes
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginación */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Anterior
        </button>
        <span style={{ margin: "0 10px" }}>{currentPage} / {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Siguiente
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>¿Estás seguro de eliminar esta solicitud?</p>
            <div
              style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
            >
              <button
                onClick={() => setShowModal(false)}
                className="cancel-button"
              >
                Cancelar
              </button>
              <button onClick={confirmDelete} className="confirm-button">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
