'use strict';

const { DataTypes } = require('sequelize');
const { PrimaryKey, AllowNull, AutoIncrement } = require('sequelize-typescript');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("marca", { 
      id_marca: {
        PrimaryKey: true,
        AllowNull: false,
        AutoIncrement: true,
        type: DataTypes.INTEGER
      },
      descricao: {
        AllowNull: false,
        type: DataTypes.STRING(100)
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("marca");
  }
};
