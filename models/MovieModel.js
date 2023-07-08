import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const { DataTypes } = Sequelize;

const Movies = db.define(
  `movies`,
  {
    name: {
      type: DataTypes.STRING,
    },
    release_date: {
      type: DataTypes.STRING,
    },
    duration: {
      type: DataTypes.STRING,
    },
  },
  { freezeTableName: true }
);

export default Movies;
