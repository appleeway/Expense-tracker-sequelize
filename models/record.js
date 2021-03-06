'use strict';
module.exports = (sequelize, DataTypes) => {
  const Record = sequelize.define('Record', {
    name: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    amount: DataTypes.NUMBER
  }, {});
  Record.associate = function (models) {
    // associations can be defined here
    Record.belongsTo(models.User)
    Record.belongsTo(models.Category)
  };
  return Record;
};