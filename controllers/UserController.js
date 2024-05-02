const { User } = require("../models/index.js");
const bcrypt = require("bcryptjs");

const UserController = {
    async create(req, res) {
        try {
            const password = await bcrypt.hashSync(req.body.password, 10);
            const user = await User.create({
                ...req.body,
                password,
                role: "user",
            });
            res.status(201).send({ message: "Usuario creado con éxito", user });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async login(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email,
                },
            });
            if (!user) {
                return res
                    .status(400)
                    .send({ message: "Usuario o contraseña incorrectos" });
            }

            const isMatch = bcrypt.compareSync(
                req.body.password,
                user.password,
            );
            if (!isMatch) {
                return res
                    .status(400)
                    .send({ message: "Usuario o contraseña incorrectos" });
            }

            res.send({ messsage: `${user.name}, logeado` });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
};

module.exports = UserController;
