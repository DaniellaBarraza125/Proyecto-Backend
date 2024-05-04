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
                len: [1, 5],
                isNumeric: true,
                validate: {
                    notNull: {
                        msg: "Por favor introduzca una calificacion",
                    },
                    Len: { msg: "la calificaicon debe ser de 1 al 5" },
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
