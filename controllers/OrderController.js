const { NOW } = require("sequelize");
const { Order, Product, OrderCategory } = require("../models/index.js");

const OrderController = {
    async create(req, res) {
        try {
            const dlvDate = new Date();
            deliveryDate.setDate(deliveryDate.getDate() + 4);

            const order = await Order.create({
                ...req.body,
                //cuando termine autentificacion puedo poner UserId = req.body.UserId para asi no tener que escribirlo
                delivery: dlvDate,
                status: "placed",
            });
            order.addProduct(req.body.ProductId);

            res.status(201).send({
                message: "Pedido creado con éxito",
                order,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
};

module.exports = OrderController;
