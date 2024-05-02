const { Category, Product } = require("../models/index.js");

const CategoryController = {
    async create(req, res) {
        try {
            const category = await Category.create(req.body);
            res.status(201).send({
                message: `Categoría ${category.name} creada con éxito`,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
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
};

module.exports = CategoryController;
