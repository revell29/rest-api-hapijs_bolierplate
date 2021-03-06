import { Sequelize, Model, DataTypes, Optional, BuildOptions } from "sequelize";
import { sequelize } from "@lib/database";

export interface CustomerAttributes {
  id: number;
  fullname: string;
  email: string;
  password: string;
  photo: string;
  no_identitas: number;
  no_hp: number;
  alamat: string;
  isActive: boolean;
  token: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Some fields are optional when calling UserModel.create() or UserModel.build()
interface CustomerCreationAttribute
  extends Optional<
    CustomerAttributes,
    "id" | "photo" | "no_identitas" | "alamat" | "isActive" | "token"
  > {}

// We need to declare an interface for our model that is basically what our class would be
interface CustomerInstance
  extends Model<CustomerAttributes, CustomerCreationAttribute>,
    CustomerAttributes {}

const Customer = sequelize.define<CustomerInstance>(
  "Customer",
  {
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
      type: DataTypes.STRING,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  { tableName: "customers" }
);

export default Customer;
