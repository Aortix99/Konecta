const { getAllEmployees } = require('../repository/get-all-employe');

const getEmployeesAll = async (req, res) => {
  try {
    const response = await getAllEmployees();
    res.status(200).json(response);

  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { getEmployeesAll };
