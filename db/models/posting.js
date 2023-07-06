'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Posting.belongsTo(models.users);
      /* Posting.belongsToMany(models.users, { through: 'comments' }); */
    }
  }
  Posting.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    drinksName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sugarLevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    shopLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postedDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

  }, {
    sequelize,
    modelName: 'posting',
    underscored: true,
    freezeTableName: true,
  });
  return Posting;
};