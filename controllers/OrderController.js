const { NOW } = require("sequelize");
const { Order, Product, OrderCategory } = require("../models/index.js");
const { trace } = require("../routes/users.js");

const OrderController = {
    async create(req, res, next) {
        try {
            const deliveryDate = new Date();
            deliveryDate.setDate(deliveryDate.getDate() + 4);

            const order = await Order.create({
                ...req.body,
                //cuando termine autentificacion puedo poner UserId = req.body.UserId para asi no tener que escribirlo
                delivery: deliveryDate,
                status: "placed",
            });
            order.addProduct(req.body.ProductId);

            res.status(201).send({
                message: "Pedido creado con éxito",
                order,
            });
        } catch (error) {
            next(error);
        }
    },
    async getAll(req, res) {
        try {
            const orders = await Order.findAll({
                include: [
                    {
                        model: Product,
                        attributes: ["name"],
                        through: { attributes: [] },
                    },
                ],
            });
            res.send(orders);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
};

module.exports = OrderController;
