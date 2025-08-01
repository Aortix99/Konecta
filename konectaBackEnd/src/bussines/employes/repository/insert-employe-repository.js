const { Employee } = require('../../../models');

const insertItemsEmploye = async (model) => {
    const newEmployee = await Employee.create({
      name: model.name,
      salary: model.salary,
      dateAdmission: model.dateAdmission || new Date()
    });
    return newEmployee;
};

module.exports = {
  insertItemsEmploye
};
