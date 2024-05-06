"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Product.belongsToMany(models.Category, {
                through: models.CategoryProduct,
            });
            Product.belongsToMany(models.Order, {
                through: models.OrderProduct,
            });
            Product.hasMany(models.Review);
        }
    }
    Product.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Por favor introduce nombre",
                    },
                },
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Por favor introduce el precio",
                    },
                },
            },
        },
        {
            sequelize,
            modelName: "Product",
        },
    );
    return Product;
};
