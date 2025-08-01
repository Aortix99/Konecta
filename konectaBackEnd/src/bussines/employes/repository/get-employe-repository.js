const { Employee } = require('../../../models');

const getItems = async (pagination = {}) => {
  const { page = 1, limit = 10 } = pagination;
  const offset = (page - 1) * limit;
  // const where = {};
  // if (filters.name) where.name = filters.name;
  const empleados = await Employee.findAndCountAll({
    limit,
    offset,
    order: [['id', 'DESC']]
  });

  const total = empleados.count;
  const totalPages = Math.ceil(total / limit);

  return {
    total,
    totalPages,
    currentPage: page,
    data: empleados.rows
  };
};

module.exports = {
  getItems
};
