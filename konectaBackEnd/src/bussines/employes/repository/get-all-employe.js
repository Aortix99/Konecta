const { Employee } = require('../../../models');

const getAllEmployees = async () => {
  const empleados = await Employee.findAll({
    order: [['id', 'ASC']]
  });

  return empleados;
};

module.exports = {
  getAllEmployees
};
