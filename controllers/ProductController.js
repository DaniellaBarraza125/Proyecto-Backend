const {
    Product,
    Category,
    CategoryProduct,
    Review,
} = require("../models/index.js");
const { Op } = require("sequelize");

const ProductController = {
    async create(req, res, next) {
        try {
            const file = req.file.originalname;

            const product = await Product.create({
                ...req.body,
                filePath: file,
            });
            product.addCategory(req.body.CategoryId);
            res.status(201).send({
                message: "Producto creado con éxito",
                product,
                file,
            });
        } catch (error) {
            next(error);
        }
    },
    async getAll(req, res) {
        try {
            const products = await Product.findAll({
                include: [
                    {
                        model: Category,
                        attributes: ["name"],
                        through: { attributes: [] },
                    },
                    {
                        model: Review,
                        attributes: ["value", "review"],
                    },
                ],
            });
            res.send(products);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async getById(req, res) {
        try {
            const product = await Product.findOne({
                where: {
                    id: req.params.id,
                },
                include: [
                    {
                        model: Category,
                        attributes: ["name"],
                        through: { attributes: [] },
                    },
                    {
                        model: Review,
                        attributes: ["value", "review"],
                    },
                ],
            });
            res.send(product);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async getByName(req, res) {
        try {
            const products = await Product.findAll({
                where: {
                    name: { [Op.like]: `%${req.params.name}%` },
                },
            });

            if (!products) {
                return res
                    .status(404)
                    .send({ message: "producto no encontrado" });
            }

            res.send(products);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async getByPrice(req, res) {
        try {
            const products = await Product.findAll({
                where: {
                    name: { [Op.like]: `%${req.params.price}%` },
                },
            });

            if (!products) {
                return res
                    .status(404)
                    .send({ message: "producto no encontrado" });
            }

            res.send({ message: "producto encontrado", products });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async oderAsc(req, res) {
        try {
            const products = await Product.findAll({
                include: [
                    {
                        model: Category,
                        attributes: ["name"],
                        through: { attributes: [] },
                    },
                ],
                order: [["price", "ASC"]],
            });
            res.send(products);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async oderDesc(req, res) {
        try {
            const products = await Product.findAll({
                include: [
                    {
                        model: Category,
                        attributes: ["name"],
                        through: { attributes: [] },
                    },
                ],
                order: [["price", "DESC"]], //se podria poner una funcion para esto o debera ser en end point???
            });
            res.send(products);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async delete(req, res) {
        try {
            await Product.destroy({
                where: {
                    id: req.params.id,
                },
            });
            await CategoryProduct.destroy({
                where: {
                    ProductId: req.params.id,
                },
            });
            res.send({ message: "Producto se ha eliminado con éxito" });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async update(req, res) {
        try {
            const file = req.file;
            const product = await Product.findOne({
                where: {
                    id: req.params.id,
                },
            });
            if (!product) {
                return res
                    .status(404)
                    .send({ message: "Producto no encontrado" });
            }
            await product.update({
                ...req.body,
                filePath: req.file.originalname,
            });

            await CategoryProduct.update(req.body, {
                where: {
                    ProductId: req.params.id,
                },
            });

            res.send({
                message: "Producto se ha actualizado con éxito",
                file,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
};

module.exports = ProductController;
