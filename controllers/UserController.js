const {
    User,
    Token,
    Sequelize,
    Product,
    Order,
} = require("../models/index.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = Sequelize;
const { jwt_secret } = require("../config/config.json")["development"];

const UserController = {
    async create(req, res, next) {
        try {
            if (!req.body.password) {
                return res
                    .status(400)
                    .send({ msg: "Por favor escribe tu contraseña" });
            }
            const password = await bcrypt.hashSync(req.body.password, 10);
            const user = await User.create({
                ...req.body,
                password,
                role: "user",
            });
            res.status(201).send({ message: "Usuario creado con éxito", user });
        } catch (error) {
            next(error);
            console.error(error);
            res.status(500).send(error);
        }
    },
    async getAll(req, res) {
        try {
            const users = await User.findAll();
            res.send({ msg: "Todos los usuarios", users });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async getByName(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    name: req.params.name,
                },
            });

            if (!user) {
                return res
                    .status(404)
                    .send({ message: "Usuario no encontrado" });
            }

            res.send({ message: "Usuario encontrado", user });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async delete(req, res) {
        try {
            await User.destroy({
                where: {
                    id: req.params.id,
                },
            });
            await Order.destroy({
                where: {
                    UserId: req.params.id,
                },
            });
            res.send("El usuario ha sido eliminado con éxito");
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
            const token = jwt.sign({ id: user.id }, jwt_secret);
            Token.create({ token, UserId: user.id });
            res.send({ message: "Bienvenid@ " + user.name, user, token });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async logout(req, res) {
        try {
            await Token.destroy({
                where: {
                    [Op.and]: [
                        { UserId: req.user.id },
                        { token: req.headers.authorization },
                    ],
                },
            });
            res.send({ message: `Usuario desconectado ¡Vuelve pronto!` });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: "hubo un problema al tratar de desconectarte",
            });
        }
    },
    async showUser(req, res) {
        try {
            const user = await User.findByPk(req.user.id, {
                include: [
                    {
                        model: Order,
                        attributes: ["id", "status"],
                        include: [
                            {
                                model: Product,
                                attributes: ["name"],
                                through: { attributes: [] },
                            },
                        ],
                    },
                ],
            });
            if (user) {
                res.send(user);
            } else {
                res.status(404).send("User not found");
            }
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
};

module.exports = UserController;
