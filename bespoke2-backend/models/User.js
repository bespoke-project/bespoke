import { DataTypes } from "sequelize";
import sequelize from "../db/server.js";

const User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  favorites: {
    type: DataTypes.JSON, // Hier wird das JSON-Datenformat verwendet
    allowNull: true,
    defaultValue: [], // Standardmäßig ein leeres Array
  },
});

export default User;
