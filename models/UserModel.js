import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const { DataTypes } = Sequelize;

const Users = db.define(
  `users`,
  {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    roles: {
      type: DataTypes.ENUM({
        values: ["admin", "user"],
      }),
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
  },
  { freezeTableName: true }
);

export default Users;
