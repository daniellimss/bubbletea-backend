'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('posting', 'photo_url',
      {
        allowNull: true,
        type: Sequelize.STRING
      });
    await queryInterface.removeColumn('posting', 'photo_id');
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('posting', 'photo_url');
    await queryInterface.addColumn('posting', 'photo_id',
      {
        allowNull: false,
        type: Sequelize.STRING
      });
  }
};
