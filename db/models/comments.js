'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comments.belongsTo(models.users);
      /*   Comments.belongsToMany(models.users, { through: 'posting' }); */
    }
  }
  Comments.init({
    postingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "posting",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },


  }, {
    sequelize,
    modelName: 'comments',
    underscored: true,
  });
  return Comments;
};