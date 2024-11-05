import { DataTypes } from "sequelize";
import sequelize from "../db/server.js";
import User from "./User.js";

const Post = sequelize.define("Post", {
  coinId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  coinName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  currentPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// Relationen festlegen
Post.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Post, { foreignKey: "userId" });

export default Post;
