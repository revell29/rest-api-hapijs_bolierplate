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
        type: DataTypes.STRING,
        allowNull: true,
      },
      no_hp: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      alamat: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
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
