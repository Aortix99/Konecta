const { insertItemsEmploye } = require('../repository/insert-employe-repository');
const Joi = require('joi');

const insertEmployee = async (req, res) => {
  const insertEmployeSchema = Joi.object({
    name: Joi.string().pattern(/^[a-zA-Z0-9 ]+$/).required().messages({
      'string.pattern.base': 'Nombre no valido'
    }),
    dateAdmission: Joi.string().required(),
    salary: Joi.number()
      .positive()
      .required()
      .messages({
        'number.base': 'El salario debe ser un número',
        'number.positive': 'El salario debe ser un número positivo',
        'any.required': 'El salario es obligatorio'
      })
  });
  const { error } = insertEmployeSchema.validate(req.body.model);
  console.log('no se queda antes', error);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { model } = req.body;
  try {
    console.log('quien es model', model);
    const employee = await insertItemsEmploye(model);
    res.status(201).json(employee);
  } catch (error) {
    console.error('Error al crear empleado:', error);
    res.status(500).json({ message: 'No se pudo crear el empleado' });
  }
};
module.exports = { insertEmployee };
