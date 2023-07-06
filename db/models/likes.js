'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Likes.belongsTo(models.users);
    }
  }
  Likes.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    postingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "posting",
        key: "id",
      },
    }
  }, {
    sequelize,
    modelName: 'likes',
    underscored: true,
  });
  return Likes;
};