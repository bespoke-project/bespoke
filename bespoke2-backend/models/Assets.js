// Assets.js
import { DataTypes } from 'sequelize';
import  sequelize  from '../db/server.js';

// Definition des Modells für die Tabelle "assets" (siehe Struktur mit SQL '\d assets;')
export const Asset = sequelize.define('Asset', {
  assetdb_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Entspricht der Verwendung von `nextval('assets_assetdb_id_seq'::regclass)`
  },
  asset_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,  // wenn es die asset_id schon gibt, nicht neu anlegen, sondern Update (siehe ...)
  },
  asset_name: {
    type: DataTypes.STRING(255),
  },
  asset_image: {
    type: DataTypes.STRING(255),
  },
  asset_description: {
    type: DataTypes.TEXT,
  },
  assetdb_created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Entspricht `CURRENT_TIMESTAMP`
  },
  assetdb_updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Entspricht `CURRENT_TIMESTAMP`
  }
  
  //   currentPrice: {
  //     type: DataTypes.FLOAT,
  //     allowNull: false,
  //   },
}, {
  tableName: 'assets', // Spezifiziert den Tabellennamen explizit
  timestamps: false,  // Deaktiviert die automatische Erstellung von `createdAt` und `updatedAt`; die Aktualisierung erfolgt über den Trigger direkt in der Datenbank
});

// Synchronisiere das Modell `Asset`, ohne die Tabellenstruktur zu ändern
Asset.sync({ alter: false });

// Export des Modells
export default Asset;
