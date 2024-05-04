const { Review } = require("../models/index");

const ReviewController = {
    async create(req, res) {
        try {
            const review = await Review.create(req.body);
            res.status(201).send({ msg: "Review creada", review });
        } catch (error) {}
    },
};
module.exports = ReviewController;
