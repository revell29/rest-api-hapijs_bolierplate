import { QueryInterface, Sequelize, DataTypes } from "sequelize";

export = {
  up: (_queryInterface: QueryInterface, _Sequelize: Sequelize) => {
    return _queryInterface.createTable("customers", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fullname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      photo: DataTypes.STRING,
      no_identitas: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      no_hp: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      alamat: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    });
  },

  down: (_queryInterface: QueryInterface, _Sequelize: Sequelize) => {
    return _queryInterface.dropTable("customers");
  },
};
