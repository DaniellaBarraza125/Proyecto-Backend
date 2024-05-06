const { Category, Product, CategoryProduct } = require("../models/index.js");
const { Op } = require("sequelize");
const { getById } = require("./ProductController.js");

const CategoryController = {
    async create(req, res, next) {
        try {
            const category = await Category.create(req.body);
            res.status(201).send({
                message: `Categoría ${category.name} creada con éxito`,
            });
        } catch (error) {
            next(error);
        }
    },
    async update(req, res) {
        try {
            await Category.update(req.body, {
                where: {
                    id: req.params.id,
                },
            });
            const product = await Product.findByPk(req.params.id);
            product.setCategories(req.body.CategoryId);
            res.send("Categoría actualizado con éxito");
        } catch (error) {
            res.status(500).send({
                message: "no ha sido posible actualizado la categoría",
            });
        }
    },
    async getAll(req, res) {
        try {
            const categories = await Category.findAll({
                include: [
                    {
                        model: Product,
                        attributes: ["name"],
                        through: { attributes: [] },
                    },
                ],
            });
            res.send(categories);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async getByCategory(req, res) {
        try {
            const categories = await Category.findAll({
                where: {
                    name: { [Op.like]: `%${req.params.category}%` },
                },
                include: [
                    {
                        model: Product,
                        attributes: ["name"],
                        through: { attributes: [] },
                    },
                ],
            });
            res.send(categories);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async getById(req, res) {
        try {
            const categories = await Category.findOne({
                where: {
                    id: req.params.id,
                },
                include: [
                    {
                        model: Product,
                        attributes: ["name"],
                        through: { attributes: [] },
                    },
                ],
            });
            res.send(categories);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async delete(req, res) {
        try {
            const categoryId = req.params.id;

            await Category.destroy({
                where: {
                    id: categoryId,
                },
            });

            // Luego, eliminar los registros asociados en la tabla intermedia
            CategoryProduct.destroy({
                where: {
                    CategoryId: categoryId,
                },
            });

            res.send({ message: "Categoría se ha eliminado con éxito" });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
};

module.exports = CategoryController;
