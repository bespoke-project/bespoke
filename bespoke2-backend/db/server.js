import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

function maskSensitiveInfo(url) {
  return url.replace(/\/\/(.*?):(.*?)@/, '//***:***@');
}

// new Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: console.log, // Alle SQL-Queries werden im Log ausgegeben // Debug
  define: {
    freezeTableName: true,
  },
});
console.log('DATABASE_URL:', maskSensitiveInfo(process.env.DATABASE_URL));

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to the NEON");

    // Synchronisiere alle Modelle mit der Datenbank
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Fehler bei der DB-Verbindung:", error);
  }
};

connectDB();

export default sequelize;
