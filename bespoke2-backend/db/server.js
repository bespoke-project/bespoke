import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  define: {
    freezeTableName: true,
  },
});

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
