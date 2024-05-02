const { Order } = require("../models/index.js");

const OrderController = {
    async create(req, res) {
        try {
            const order = await Order.create(req.body);
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
