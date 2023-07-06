'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.posting);
      Users.hasMany(models.comments);
      Users.hasMany(models.likes);
    }
  }
  Users.init({
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
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
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    gender: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },

  }, {
    sequelize,
    modelName: 'users',
    underscored: true,
  });
  return Users;
};