'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    designation: {
      type: DataTypes.STRING,
      defaultValue: false
    },
    salary: DataTypes.NUMBER
  }, {});
  Employee.associate = function(models) {
    // associations can be defined here
    Employee.belongsTo(models.Company, {
      foreignKey: 'companyId',
      onDelete: 'CASCADE',
      as: 'company'
    })
  };
  return Employee;
};