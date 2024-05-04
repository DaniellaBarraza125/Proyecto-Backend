"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert("Products", [
            {
                name: "Sudadera Friends",
                price: 50,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Sudadera Hachiko",
                price: 50,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Sudadera New Girl",
                price: 50,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Taza Avengers",
                price: 10,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Taza Star Wars",
                price: 15,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
