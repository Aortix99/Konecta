const { getItems } = require('../repository/get-employe-repository');

const getEmployees = async (req, res) => {
  try {
    const { paginacion } = req.body;
    console.log('si pasa por aca', paginacion);
    const response = await getItems(paginacion);
    res.status(200).json(response);

  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { getEmployees };
