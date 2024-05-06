const {
    Review,
    Product,
    User,
    Category,
    CategoryProduct,
} = require("../models/index");

const ReviewController = {
    async create(req, res) {
        try {
            const file = req.file.path;

            const review = await Review.create({ ...req.body, filePath: file });
            res.status(201).send({
                message: "Review publicada",
                review,
                file,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async getAll(req, res) {
        try {
            const reviews = await Review.findAll({
                include: [
                    {
                        model: User,
                        attributes: ["name"],
                    },
                    {
                        model: Product,
                        attributes: ["name"],
                        include: [
                            {
                                model: Category,
                                attributes: ["name"],
                                through: { attributes: [] },
                            },
                        ],
                    },
                ],
            });
            res.send(reviews);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async delete(req, res) {
        try {
            await Review.destroy({
                where: req.params.id,
            });
            res.send("Review eliminada");
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
};
module.exports = ReviewController;
