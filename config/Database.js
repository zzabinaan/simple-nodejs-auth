import { Sequelize } from "sequelize";
const db = new Sequelize("node_auth", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
