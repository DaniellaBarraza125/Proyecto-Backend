"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Review extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Review.belongsTo(models.Product);
            Review.belongsTo(models.User);
        }
    }
    Review.init(
        {
            review: DataTypes.STRING,
            ProductId: DataTypes.INTEGER,
            UserId: DataTypes.INTEGER,
            value: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt: { msg: "Debe ser un numero entero" },
                    min: {
                        args: [1],
                        msg: "Debe ser un numero mayor o igual a 1",
                    },
                    max: {
                        args: [5],
                        msg: "Debe ser un numero menor o igual a 5",
                    },
                },
            },
        },
        {
            sequelize,
            modelName: "Review",
        },
    );
    return Review;
};
